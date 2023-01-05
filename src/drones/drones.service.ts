import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseString } from 'xml2js';
import { PilotsService } from 'src/pilots/pilots.service';

@Injectable()
export class DronesService {
  constructor(private pilotsService: PilotsService) {}

  calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number => {
    const distanceGross = Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2),
    );
    const distance = distanceGross / 1000;
    return distance;
  };

  async getDrones(): Promise<any> {
    const response = await axios.get(
      'https://assignments.reaktor.com/birdnest/drones',
    );
    const xml = response.data.toString();
    let drones = [];
    parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        drones = result.report.capture[0].drone.map((drone) => {
          return {
            serialNumber: drone.serialNumber[0],
            model: drone.model[0],
            x: parseFloat(drone.positionX[0]),
            y: parseFloat(drone.positionY[0]),
            altitude: parseFloat(drone.altitude[0]),
            distance: this.calculateDistance(
              parseFloat(drone.positionX[0]),
              parseFloat(drone.positionY[0]),
              250000,
              250000,
            ),
            timestamp: new Date(
              result.report.capture[0]['$'].snapshotTimestamp,
            ),
            NDZtimestamp:
              this.calculateDistance(
                parseFloat(drone.positionX[0]),
                parseFloat(drone.positionY[0]),
                250000,
                250000,
              ) <= 100
                ? new Date(result.report.capture[0]['$'].snapshotTimestamp)
                : null,
          };
        });
      }
    });
    return drones;
  }

  async getViolatingDrones(): Promise<any[]> {
    const drones = await this.getDrones();

    const violatingDrones = drones.map(async (drone) => {
      if (drone.distance <= 100) {
        try {
          const pilot = await this.pilotsService.getPilot(drone.serialNumber);
          return {
            ...drone,
            pilot,
          };
        } catch (error) {
          console.log(error);
        }
      }
    });
    return (await Promise.all(violatingDrones)).filter(Boolean);
  }
}
