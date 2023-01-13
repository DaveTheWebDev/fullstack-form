import {
  MinLength,
  MaxLength,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  MinDate,
  MaxDate,
} from 'class-validator';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

export class EventDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  userEmail: string;
  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date())
  @MaxDate(new Date(year + 10, month))
  eventDate: string;
}
