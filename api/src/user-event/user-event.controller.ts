import { UserEventDto } from './dtos/user-event.dto';
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserEventService } from './user-event.service';

@Controller('user-event')
export class UserEventController {
  constructor(private readonly userEventsService: UserEventService) {}

  @Get('all')
  getEvents() {
    return this.userEventsService.getEvents({});
  }
  @Post('add')
  addEvent(@Body() body: UserEventDto) {
    return this.userEventsService.addEvent(body);
  }
}
