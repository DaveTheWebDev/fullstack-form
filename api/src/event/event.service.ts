import { EventDto } from './dtos/event.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async getEvents(email: string): Promise<Event[]> {
    return await this.prisma.event.findMany({ where: { userEmail: email } });
  }

  async addEvent(eventBody: EventDto): Promise<Event> {
    const date = new Date(eventBody.eventDate);
    const response = await this.prisma.event.create({
      data: { ...eventBody, date },
    });
    return response;
  }
}
