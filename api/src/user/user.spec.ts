import { Test } from '@nestjs/testing';
import { UserEvent } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  let userEventController: UserController;
  let userEventService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userEventService = moduleRef.get<UserService>(UserService);
    userEventController = moduleRef.get<UserController>(UserController);
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

      const getEventsResult = await userEventService.addEvent({
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
