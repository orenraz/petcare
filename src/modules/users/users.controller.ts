import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Controller('users')
export class UsersController{
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        //return this.userService.createUser(createUserDto);
    }
}