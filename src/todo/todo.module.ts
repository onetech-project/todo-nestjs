import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './schemas/todo.schema';
import * as moment from 'moment';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ToDo.name,
        useFactory: () => {
          const schema = ToDoSchema;
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
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
