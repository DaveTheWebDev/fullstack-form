import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const user: User = {
    id: 5,
    name: 'Dawid',
    surname: 'Antczak',
    email: 'dawidantczak2@gmail.com',
  };

  const mockUserRepository = {
    get: jest.fn((): Promise<User> => Promise.resolve(user)),
    create: jest.fn((): Promise<User> => Promise.resolve(user)),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserRepository,
        },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get', () => {
    it('should return user when email is given', async () => {
      expect(await userService.get(user.email)).toEqual(user);
    });

    it('should call user repository get method', async () => {
      await userService.get(user.email);
      expect(mockUserRepository.get).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create new user when name, surname and email are given', async () => {
      const { id, ...restUser } = user;
      expect(await userService.create(restUser)).toEqual(user);
    });

    it('should call user repository create method', async () => {
      const { id, ...restUser } = user;
      await userService.create(restUser);
      expect(mockUserRepository.create).toBeCalledTimes(1);
    });
  });
});
