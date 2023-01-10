import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class PilotsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getPilot(serialNumber: string): Promise<any> {
    const pilot = await this.cacheManager.get(serialNumber);
    if (!pilot) {
      try {
        const response = await axios.get(
          `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
        );
        const pilot = response.data;
        this.cacheManager.set(serialNumber, { key: pilot });
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
