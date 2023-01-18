import { createUserDto } from './dtos/createUser.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.userService.get(email);
  }

  @Post('create')
  addEvent(@Body() createUserBody: createUserDto) {
    return this.userService.create(createUserBody);
  }
}
