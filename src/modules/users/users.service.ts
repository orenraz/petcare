import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";     
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/UpdateUserDto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    getUsers() {    
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    async createUser(createUserDto: CreateUserDto) {
        const { password, ...userData } = createUserDto;
        const passwordHash = await bcrypt.hash(password, 10);
        const createdUser = new this.userModel({ ...userData, passwordHash });
        return createdUser.save();
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate (id, updateUserDto, { new: true });
    }  
    
    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}