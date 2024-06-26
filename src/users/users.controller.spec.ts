import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { EncryptionModule } from '../helper/encryption/encryption.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        EncryptionModule,
      ],
      controllers: [UsersController],
      providers: [
        {
          // Provider for the mongoose model
          provide: getModelToken(Users.name),
          useValue: Model,
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
