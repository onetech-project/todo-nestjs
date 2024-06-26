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
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create an User' })
  @Post()
  create(@Body() createTodoDto: CreateUsersDto) {
    return this.usersService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Get All User' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find User By ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an User' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @Put(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTodoDto: UpdateUsersDto,
  ) {
    return this.usersService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Delete an User' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.usersService.remove(id);
  }
}
