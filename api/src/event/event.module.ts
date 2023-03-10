import { EventRepository } from './event.repository';
import { PrismaService } from '../prisma/prisma.service';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EventController],
  providers: [
    { provide: EventService, useClass: EventRepository },
    PrismaService,
  ],
})
export class EventModule {}
