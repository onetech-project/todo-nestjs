import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EncryptionModule } from '../helper/encryption/encryption.module';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from '../users/schemas/users.schema';
import { Model } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule,
        EncryptionModule,
      ],
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
