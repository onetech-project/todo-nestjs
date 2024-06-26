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
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Add a ToDo' })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Headers() headers: any) {
    return this.todoService.create(createTodoDto, headers.user);
  }

  @ApiOperation({ summary: 'Get All ToDo' })
  @Get()
  findAll(@Query() query: Record<any, any>, @Headers() header: any) {
    const payload = { ...query, user: header.user };
    return this.todoService.findAll(payload);
  }

  @ApiOperation({ summary: 'Get a ToDo' })
  @ApiParam({ name: 'id', description: 'Todo ID', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId, @Headers() header: any) {
    return this.todoService.findOne(id, header.user);
  }

  @ApiOperation({ summary: 'Update a ToDo' })
  @ApiParam({ name: 'id', description: 'Todo ID', type: 'string' })
  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTodoDto: UpdateTodoDto,
    @Headers() header: any,
  ) {
    return this.todoService.update(id, updateTodoDto, header.user);
  }

  @ApiOperation({ summary: 'Delete a ToDo' })
  @ApiParam({ name: 'id', description: 'Todo ID', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId, @Headers() header: any) {
    return this.todoService.remove(id, header.user);
  }
}
