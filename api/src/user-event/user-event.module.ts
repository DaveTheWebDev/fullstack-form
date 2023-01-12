import { PrismaService } from '../prisma/prisma.service';
import { UserEventService } from './user-event.service';
import { UserEventController } from './user-event.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserEventController],
  providers: [UserEventService, PrismaService],
})
export class UserEventsModule {}
