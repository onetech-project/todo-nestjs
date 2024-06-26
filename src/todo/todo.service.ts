import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo } from './schemas/todo.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(ToDo.name) private todoModel: Model<ToDo>) {}

  async create(
    createTodoDto: CreateTodoDto,
    user: Record<any, any>,
  ): Promise<ToDo> {
    const createdToDo = new this.todoModel({
      ...createTodoDto,
      createdBy: user._id,
      updatedBy: user._id,
    });
    return createdToDo.save();
  }

  async findAll(payload: Record<any, any>): Promise<ToDo[]> {
    const todos = await this.todoModel.find({
      createdBy: payload.user._id,
    });
    return todos;
  }

  async findOne(
    id: Types.ObjectId,
    user: Record<any, any>,
  ): Promise<ToDo | null> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Data not found.');
    }
    if (todo?.createdBy !== user._id) {
      throw new UnauthorizedException('You do not have access to this data.');
    }
    return todo;
  }

  async update(
    id: Types.ObjectId,
    updateTodoDto: UpdateTodoDto,
    user: Record<any, any>,
  ): Promise<ToDo | null> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Data not found.');
    }
    if (todo?.createdBy !== user._id) {
      throw new UnauthorizedException('You do not have access to this data.');
    }
    await this.todoModel.updateOne(
      { _id: id, createdBy: user._id },
      updateTodoDto,
    );
    return this.todoModel.findById(id);
  }

  async remove(
    id: Types.ObjectId,
    user: Record<any, any>,
  ): Promise<ToDo | null> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Data not found.');
    }
    if (todo?.createdBy !== user._id) {
      throw new UnauthorizedException('You do not have access to this data.');
    }
    await this.todoModel.deleteOne({ _id: id });
    return todo;
  }
}
