import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesService } from './drones/drones.service';
import { DronesController } from './drones/drones.controller';
import { PilotsService } from './pilots/pilots.service';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [AppService, DronesService, PilotsService],
})
export class AppModule {}
