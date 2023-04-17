import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '@common/decorators/match.decorator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Insert old password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  oldPassword: string;

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
