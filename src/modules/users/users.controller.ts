import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUserDto";

@Controller('users')
export class UsersController{
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        // TODO: move this to a middleware
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const findUser = await this.userService.getUserById(id);
        if (!findUser) throw new HttpException('User not found', 404);
        
        return findUser;
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const updateUser = await this.userService.updateUser(id, updateUserDto);
        if (!updateUser) throw new HttpException('User not found', 404);
        return updateUser;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {       
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const deletedUser = await this.userService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }
}