import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  nit: number;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  legal_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}
