import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";     
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { UserSettings } from "src/schemas/UserSettings.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, 
    @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>) {}

    getUsers() {    
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    async createUser({settings, ...createUserDto}: CreateUserDto) {
        const { password, ...userData } = createUserDto;
        const passwordHash = await bcrypt.hash(password, 10);

        if(settings){
            // first create the user settings and get their _id
            const newSettings = new this.userSettingsModel(settings);
            const savedSettings = await newSettings.save();

            // create the user with the settings _id
            const createdUser = new this.userModel({ 
                ...userData, 
                passwordHash, 
                settings: savedSettings._id 
            });
            return createdUser.save();
        }
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