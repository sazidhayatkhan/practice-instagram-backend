import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto:CreateUserDto){
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAll(){
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async getOne(@Param('id') id:string){
        return await this.usersService.getUserById(id)
    }

    @Put(':id')
    async update(@Param('id') id:string,@Body() updateUserDto:UpdateUserDto){
        return await this.usersService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.usersService.deleteUser(id)
    }
}
