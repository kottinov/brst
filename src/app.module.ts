import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesService } from './drones/drones.service';
import { DronesController } from './drones/drones.controller';
import { PilotsService } from './pilots/pilots.service';
import { PilotsController } from './pilots/pilots.controller';
import { CorsOptions } from 'cors';
import cors from 'cors';
import { APP_INTERCEPTOR } from '@nestjs/core';

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 600,
    }),
  ],
  controllers: [AppController, DronesController, PilotsController],
  providers: [
    AppService,
    DronesService,
    PilotsService,
    {
      provide: 'CORS_OPTIONS',
      useValue: corsOptions,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
