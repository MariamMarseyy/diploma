import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'Insert roleId.',
  })
  @IsUUID('4')
  roleId: string;

  @ApiProperty({
    description: 'Insert name.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Insert sur name.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Surname is required' })
  surname: string;

  @ApiProperty({
    description: 'Insert email. Ex: peterwillson@gmail.com.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    description: 'Insert password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
