import { EventDto } from './dtos/event.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('all/:email')
  async getEvents(@Param('email') email: string) {
    return this.eventService.getEvents(email);
  }

  @Post('add')
  async addEvent(@Body() body: EventDto) {
    return await this.eventService.addEvent(body);
  }
}
