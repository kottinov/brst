import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PilotsService {
  async getPilot(serialNumber: string): Promise<any> {
    const response = await axios.get(
      `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
    );
    if (response.status === 404) {
      throw new NotFoundException(
        `Pilot not found for serial number ${serialNumber}`,
      );
    }
    return response.data;
  }
}
