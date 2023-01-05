import { Controller, Get } from '@nestjs/common';
import { DronesService } from './drones.service';

@Controller('drones')
export class DronesController {
  constructor(private dronesService: DronesService) {}

  @Get()
  async getDrones(): Promise<any> {
    return await this.dronesService.getDrones();
  }

  @Get('/violating')
  async getViolatingDrones(): Promise<any[]> {
    return await this.dronesService.getViolatingDrones();
  }
}
