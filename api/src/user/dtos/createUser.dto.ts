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
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  email: string;
}
