import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { EncryptionService } from '../helper/encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByEmail(signInDto.username);

    if (!user) {
      throw new UnauthorizedException('Username/Password is not match.');
    }

    const { password, ...payload } = user;

    const passwordMatch = await this.encryptionService.compareDataToHash(
      signInDto.password,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Username/Password is not match.');
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    return this.usersService.create(registerDto);
  }
}
