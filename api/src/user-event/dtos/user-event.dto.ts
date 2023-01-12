import { IsString, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsDateString()
  eventDate: string;
}
