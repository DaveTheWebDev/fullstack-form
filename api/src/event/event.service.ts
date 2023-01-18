import { EventDto } from './dtos/event.dto';
import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';

export interface IEventService {
  getAll(email: string): Promise<Event[]>;
  create(createUserBody: EventDto): Promise<Event>;
}

@Injectable()
export class EventService implements IEventService {
  constructor(private readonly eventRepository: IEventService) {}

  async getAll(email: string): Promise<Event[]> {
    return await this.eventRepository.getAll(email);
  }

  async create(eventBody: EventDto): Promise<Event> {
    return await this.eventRepository.create(eventBody);
  }
}
