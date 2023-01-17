import { createUserDto } from './dtos/createUser.dto';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      throw new NotFoundException('User with given email does not exist');
    return user;
  }

  async createUser(createUserBody: createUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserBody.email },
    });
    if (user) {
      throw new NotAcceptableException('User with given email already exists');
    }
    return await this.prisma.user.create({ data: createUserBody });
  }
}
