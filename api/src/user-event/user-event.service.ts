import { UserEventDto } from './dtos/user-events.dto';
import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserEvent } from '@prisma/client';

@Injectable()
export class UserEventService {
  constructor(private prisma: PrismaService) {}

  async getEvents(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserEventWhereUniqueInput;
    where?: Prisma.UserEventWhereInput;
    orderBy?: Prisma.UserEventOrderByWithRelationInput;
  }): Promise<UserEvent[]> {
    return await this.prisma.userEvent.findMany(params);
  }

  async addEvent(@Body() userEventBody: UserEventDto): Promise<UserEvent> {
    const eventDate = new Date(userEventBody.eventDate);
    const response = await this.prisma.userEvent.create({
      data: { ...userEventBody, eventDate },
    });
    console.log(response);
    return response;
  }
}
