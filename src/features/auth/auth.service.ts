import { UserEntity } from '@features/user/entities/user.entity';
import { UserService } from '@features/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtSignOptions } from "@nestjs/jwt/dist/interfaces";
import { SigninResponseDto } from './dto/signin-response.dto';

@Injectable()
export class AuthService {
  private readonly accessTokenOptions: JwtSignOptions;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.accessTokenOptions = {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
    };
  }

  async validateUserForLocalStrategy(email: string, password: string) {
    const user: UserEntity = await this.userService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (isPasswordMatching) {
      await this.userService.updateLastLogin(user.id);
      return user;
    }

    return null;
  }

  async getAccessToken(user: UserEntity): Promise<SigninResponseDto> {
    const payload: JwtPayload = { sub: user.id };
    const accessToken: string = this.jwtService.sign(payload, this.accessTokenOptions);

    return {
      access_token: accessToken,
      user
    };
  }
}
