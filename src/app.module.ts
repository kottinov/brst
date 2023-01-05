import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesService } from './drones/drones.service';
import { DronesController } from './drones/drones.controller';

@Module({
  imports: [],
  controllers: [AppController, DronesController],
  providers: [AppService, DronesService],
})
export class AppModule {}
