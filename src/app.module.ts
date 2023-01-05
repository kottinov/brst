import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesService } from './drones/drones.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DronesService],
})
export class AppModule {}
