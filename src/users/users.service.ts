import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model, Types } from 'mongoose';
import { EncryptionService } from '../helper/encryption/encryption.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private encryptionService: EncryptionService,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<any> {
    const { password, ...user } = createUsersDto;
    const hashedPassword = await this.encryptionService.hashing(password);
    const createdUsers = new this.usersModel({
      ...user,
      password: hashedPassword,
    });
    await createdUsers.save();
    return user;
  }

  async findAll(): Promise<Users[]> {
    const todos = await this.usersModel.find().select({ password: 0 });
    return todos;
  }

  async findOne(id: Types.ObjectId): Promise<Users | null> {
    return this.usersModel.findById(id).select({ password: 0 });
  }

  async update(
    id: Types.ObjectId,
    updateUsersDto: UpdateUsersDto,
  ): Promise<Users | null> {
    await this.usersModel.updateOne({ _id: id }, updateUsersDto);
    return this.usersModel.findById(id).select({ password: 0 });
  }

  async remove(id: Types.ObjectId): Promise<Users | null> {
    return this.usersModel.findByIdAndDelete(id).select({ password: 0 });
  }

  async findByEmail(email: string): Promise<Users | null | undefined> {
    const users = await this.usersModel.findOne({ email });
    return users?.toObject();
  }
}
