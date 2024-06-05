import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { ToDo } from './schemas/todo.schema';
import { Model } from 'mongoose';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          // Provider for the mongoose model
          provide: getModelToken(ToDo.name),
          useValue: Model,
        },
        TodoService,
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
