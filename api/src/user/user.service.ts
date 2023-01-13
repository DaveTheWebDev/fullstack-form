import { createUserDto } from './dtos/createUser.dto';
import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async createUser(@Body() createUserBody: createUserDto) {
    const isUserCreated = await this.getUser(createUserBody.email);

    if (!isUserCreated) {
      return await this.prisma.user.create({ data: createUserBody });
    }
    // a co tu?
  }
}
