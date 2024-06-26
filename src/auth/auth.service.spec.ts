import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EncryptionModule } from '../helper/encryption/encryption.module';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule,
        EncryptionModule,
      ],
      providers: [
        {
          // Provider for the mongoose model
          provide: getModelToken(Users.name),
          useValue: Model,
        },
        AuthService,
        UsersService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
