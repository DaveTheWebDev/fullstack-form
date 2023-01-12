import { Test } from '@nestjs/testing';
import { UserEvent } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { UserEventController } from './user-event.controller';
import { UserEventService } from './user-event.service';

const result: UserEvent[] = [
  {
    id: 1,
    name: 'John',
    surname: 'Any',
    email: 'jhonny@gmail.com',
    eventDate: new Date(),
  },
];

describe('UserEventController', () => {
  let userEventController: UserEventController;
  let userEventService: UserEventService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserEventController],
      providers: [UserEventService, PrismaService],
    }).compile();

    userEventService = moduleRef.get<UserEventService>(UserEventService);
    userEventController =
      moduleRef.get<UserEventController>(UserEventController);
  });

  describe('getEvents', () => {
    it('should return an array of user events', async () => {
      jest.spyOn(userEventService, 'getEvents').mockResolvedValue(result);

      const getEventsResult = await userEventController.getEvents();

      expect(getEventsResult).toBe(result);
    });
  });
  describe('addEvent', () => {
    it('should return an array of user events', async () => {
      jest.spyOn(userEventService, 'addEvent');

      const getEventsResult = await userEventController.addEvent({
        name: '321',
        surname: 'Any',
        email: 'jhodnnygmail.com',
        eventDate: '2022-09-22',
      });
      console.log(getEventsResult);
      expect(getEventsResult).toBe(result);
    });
  });
});
