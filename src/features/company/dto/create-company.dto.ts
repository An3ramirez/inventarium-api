import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nit: string;
  
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
