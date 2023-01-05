import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesService } from './drones/drones.service';
import { DronesController } from './drones/drones.controller';
import { PilotsService } from './pilots/pilots.service';
import { PilotsController } from './pilots/pilots.controller';

@Module({
  imports: [],
  controllers: [AppController, DronesController, PilotsController],
  providers: [AppService, DronesService, PilotsService],
})
export class AppModule {}
