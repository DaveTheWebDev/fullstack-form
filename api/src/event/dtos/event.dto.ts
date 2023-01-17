import { Transform } from 'class-transformer';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  MinDate,
  MaxDate,
  IsDate,
} from 'class-validator';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();

export class EventDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  userEmail: string;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(year, month, day))
  @MaxDate(new Date(year + 10, month, day))
  eventDate: string;
}
