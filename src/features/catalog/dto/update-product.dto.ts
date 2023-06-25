import { IsString, IsInt, MaxLength, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  description?: string;
}
