import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PilotsService {
  async getPilot(serialNumber: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new NotFoundException('Pilot not found');
      }
      throw error;
    }
  }
}
