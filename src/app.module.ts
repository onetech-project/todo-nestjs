import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { EncryptionService } from './helper/encryption/encryption.service';
import { EncryptionModule } from './helper/encryption/encryption.module';
import Modules from './module-list';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    EncryptionModule,
    ...Modules.map((x) => x.module),
  ],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule {}
