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
// import { AutoMap } from '@automapper/classes';

export class PortfolioDto {
  @ApiProperty({
    description: 'Insert portfolio.',
  })
  @IsString()
  @IsNotEmpty({ message: 'exchange name is required' })
  // @AutoMap()
  exchange: string;

  @ApiProperty({
    description: 'Insert api key.',
  })
  @IsString()
  @IsNotEmpty({ message: 'api key is required' })
  // @AutoMap()
  api_key: string;

  @ApiProperty({
    description: 'Insert api key.',
  })
  @IsString()
  @IsNotEmpty({ message: 'api secret is required' })
  // @AutoMap()
  api_secret: string;
}
