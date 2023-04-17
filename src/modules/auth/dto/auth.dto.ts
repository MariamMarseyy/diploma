import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Match } from '@common/decorators/match.decorator';

export class AuthRequestDto {
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({
    description: 'Insert account email.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Insert account password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Check is robot or not',
  })
  @IsOptional()
  @IsString()
  human: string;
}
export class EmailDto {
  @ApiProperty({
    description: 'Insert account email.',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Insert token.',
  })
  @IsUUID('4')
  token: string;

  @ApiProperty({
    description: 'Insert new password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password.',
  })
  @IsString()
  @Match('password', { message: 'must match the password' })
  passwordConfirm: string;
}

export class RegisterUserDto {
  @ApiProperty({
    description: 'Insert name.',
  })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    description: 'Insert surname.',
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
  @ApiPropertyOptional({
    description: 'Insert password.',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  //
  //
  // @ApiProperty({
  //   description: 'User auth from google or not',
  // })
  // @IsBoolean()
  // googleStatus: boolean;
}

export class SignUpDto {
  @ApiProperty({
    description: 'Insert email. Ex: peterwillson@gmail.com.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiPropertyOptional({
    description: 'Insert password.',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
  //
  // @IsBoolean()
  // googleStatus: boolean;
}
