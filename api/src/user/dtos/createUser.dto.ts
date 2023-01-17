import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  name: string;
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  email: string;
}
