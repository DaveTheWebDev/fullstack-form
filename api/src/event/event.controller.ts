import { EventDto } from './dtos/event.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('all/:email')
  getEvents(@Param('email') email: string) {
    return this.eventService.getEvents(email);
  }

  @Post('add')
  addEvent(@Body() body: EventDto) {
    return this.eventService.addEvent(body);
  }
}
