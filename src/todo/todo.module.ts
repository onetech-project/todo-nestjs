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
                if (x._doc.createdAt) {
                  x._doc.createdAt = moment(x._doc.createdAt)
                    .utcOffset(7)
                    .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
                if (x._doc.updatedAt) {
                  x._doc.updatedAt = moment(x._doc.updatedAt)
                    .utcOffset(7)
                    .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
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
