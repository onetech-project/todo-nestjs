import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo } from './schemas/todo.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(ToDo.name) private todoModel: Model<ToDo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<ToDo> {
    const createdToDo = new this.todoModel(createTodoDto);
    return createdToDo.save();
  }

  async findAll(): Promise<ToDo[]> {
    const todos = await this.todoModel.find();
    return todos;
  }

  async findOne(id: Types.ObjectId): Promise<ToDo | null> {
    return this.todoModel.findById(id);
  }

  async update(
    id: Types.ObjectId,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ToDo | null> {
    await this.todoModel.updateOne({ _id: id }, updateTodoDto);
    return this.todoModel.findById(id);
  }

  async remove(id: Types.ObjectId): Promise<ToDo | null> {
    return this.todoModel.findByIdAndDelete(id);
  }
}
