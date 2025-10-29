import {
  IsInt,
  IsOptional,
  Min,
  Max,
  IsBoolean,
  IsString,
  IsIn,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FilterArticleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'updatedAt', 'title', 'publishedAt', 'viewCount'])
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  order?: 'DESC' | 'ASC';
}
