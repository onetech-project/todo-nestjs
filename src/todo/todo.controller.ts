import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Types } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Headers() headers: any) {
    return this.todoService.create(createTodoDto, headers.user);
  }

  @Get()
  findAll(@Query() query: Record<any, any>, @Headers() header: any) {
    const payload = { ...query, user: header.user };
    return this.todoService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @Headers() header: any) {
    return this.todoService.findOne(id, header.user);
  }

  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTodoDto: UpdateTodoDto,
    @Headers() header: any,
  ) {
    return this.todoService.update(id, updateTodoDto, header.user);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId, @Headers() header: any) {
    return this.todoService.remove(id, header.user);
  }
}
