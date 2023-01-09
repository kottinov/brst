import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as NodeCache from 'node-cache';

@Injectable()
export class PilotsService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 600, // 10 minutes
      checkperiod: 120, // 2 minutes
    });
  }

  async getPilot(serialNumber: string): Promise<any> {
    const pilot = this.cache.get(serialNumber);
    if (!pilot) {
      try {
        const response = await axios.get(
          `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
        );
        const pilot = response.data;
        this.cache.set(serialNumber, pilot);
        return pilot; // because otherwise it would return undefined if the pilot was not in the cache
      } catch (error) {
        if (error.response.status === 404) {
          throw new NotFoundException('Pilot not found');
        }
        throw error;
      }
    }
    return pilot;
  }
}
