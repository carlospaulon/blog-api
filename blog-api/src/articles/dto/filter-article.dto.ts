import {
  IsInt,
  IsOptional,
  Min,
  Max,
  IsBoolean,
  IsString,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

//Checar valores padrões do DTO, pois acusam como undefined no service
export class FilterArticleDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Boolean)
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
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  order?: 'DESC' | 'ASC' = 'DESC';
}
