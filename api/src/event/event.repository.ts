import { IEventService } from './event.service';
import { EventDto } from './dtos/event.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventRepository implements IEventService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(email: string): Promise<Event[]> {
    return await this.prisma.event.findMany({ where: { userEmail: email } });
  }

  async create(eventBody: EventDto): Promise<Event> {
    const date = new Date(eventBody.eventDate);
    const response = await this.prisma.event.create({
      data: { userEmail: eventBody.userEmail, date },
    });
    return response;
  }
}
