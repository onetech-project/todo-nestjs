import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Types } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createTodoDto: CreateUsersDto) {
    return this.usersService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTodoDto: UpdateUsersDto,
  ) {
    return this.usersService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
