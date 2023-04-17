import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginateDto {
  @IsOptional()
  @ApiPropertyOptional({
    type: 'number',
  })
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @ApiPropertyOptional({
    type: 'number',
  })
  @IsNumber()
  @Type(() => Number)
  pageSize = 30;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsOptional()
  @IsString({ each: true })
  sort: string[] = [];

  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsString()
  search: string;
}
