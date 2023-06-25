import { UserEntity } from '@features/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  access_token: string;

  @ApiProperty()
  user: UserEntity;
}