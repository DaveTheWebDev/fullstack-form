import { createUserDto } from './dtos/createUser.dto';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export interface IUserService {
  get(email: string): Promise<User>;
  create(createUserBody: createUserDto): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserService) {}

  async get(email: string): Promise<User> {
    const user = await this.userRepository.get(email);
    if (!user)
      throw new NotFoundException('User with given email does not exist');
    return user;
  }

  async create(createUserBody: createUserDto) {
    const user = await this.userRepository.get(createUserBody.email);
    if (user) {
      throw new NotAcceptableException('User with given email already exists');
    }
    return await this.userRepository.create(createUserBody);
  }
}
