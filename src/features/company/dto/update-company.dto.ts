import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCompanyDto {
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
