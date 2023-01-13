import { PrismaService } from '../prisma/prisma.service';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
