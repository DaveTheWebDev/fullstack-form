import { createUserDto } from './dtos/createUser.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { IUserService } from './user.service';

@Injectable()
export class UserRepository implements IUserService {
  constructor(private readonly prisma: PrismaService) {}

  async get(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async create(createUserBody: createUserDto) {
    return await this.prisma.user.create({ data: createUserBody });
  }
}
