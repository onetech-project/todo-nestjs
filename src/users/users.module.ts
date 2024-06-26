import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import * as moment from 'moment';
import { EncryptionModule } from '../helper/encryption/encryption.module';

@Module({
  imports: [
    EncryptionModule,
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: () => {
          const schema = UsersSchema;
          schema.post(/^find/, function (doc) {
            if (doc) {
              (Array.isArray(doc) ? doc : [doc]).forEach((x) => {
                ['createdAt', 'updatedAt'].forEach((y) => {
                  if (x._doc[y]) {
                    x._doc[y] = moment(x._doc[y])
                      .utcOffset(7)
                      .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                  }
                });
              });
            }
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
