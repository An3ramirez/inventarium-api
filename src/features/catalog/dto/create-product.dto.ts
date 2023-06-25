import { IsNotEmpty, IsString, IsInt, MaxLength, IsNumber, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty()
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  description: string;
}
