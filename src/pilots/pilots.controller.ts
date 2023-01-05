import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PilotsService } from './pilots.service';

@Controller('pilots')
export class PilotsController {
  constructor(@Inject(PilotsService) private pilotsService: PilotsService) {}

  @Get(':serialNumber')
  async getPilot(@Param('serialNumber') serialNumber: string): Promise<any> {
    return this.pilotsService.getPilot(serialNumber);
  }
}
