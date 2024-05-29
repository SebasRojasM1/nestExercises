import { IsOptional, IsString, IsInt, IsIn, IsNumber } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumber()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  limit?: number;
}