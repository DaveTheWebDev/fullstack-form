import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    { provide: UserService, useClass: UserRepository },
    PrismaService,
  ],
})
export class UserModule {}
