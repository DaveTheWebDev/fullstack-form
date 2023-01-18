import { Test } from '@nestjs/testing';
import { Event, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EventController } from './event.controller';
import { EventService } from './event.service';

export const events: Event[] = [
  {
    date: new Date('2023-01-17T21:08:43.149Z'),
    id: 68,
    userEmail: 'dawidantczak2@gmail.com',
  },
  {
    date: new Date('2023-01-20T21:08:43.149Z'),
    id: 69,
    userEmail: 'dawidantczak2@gmail.com',
  },
  {
    date: new Date('2023-01-19T21:08:43.149Z'),
    id: 70,
    userEmail: 'dawidantczak2@gmail.com',
  },
];

const mockEventRepository = {
  getAll: jest.fn((): Promise<Event[]> => Promise.resolve(events)),
  create: jest.fn((): Promise<Event> => Promise.resolve(events[0])),
};

const user: User = {
  id: 5,
  name: 'Dawid',
  surname: 'Antczak',
  email: 'dawidantczak2@gmail.com',
};

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventRepository,
        },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    eventService = moduleRef.get<EventService>(EventService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return events array when email is given', async () => {
      expect(await eventService.getAll(user.email)).toEqual(events);
    });

    it('should call event repository getAll method', async () => {
      await eventService.getAll(user.email);
      expect(mockEventRepository.getAll).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create new user when name, surname and email are given', async () => {
      const { date, userEmail } = events[0];
      expect(
        await eventService.create({ userEmail, eventDate: date.toISOString() }),
      ).toEqual(events[0]);
    });

    it('should call user repository create method', async () => {
      const { date, userEmail } = events[0];
      await eventService.create({ userEmail, eventDate: date.toISOString() });
      expect(mockEventRepository.create).toBeCalledTimes(1);
    });
  });
});
