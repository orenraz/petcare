import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";     
import { Model } from "mongoose";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { CreateUserSettingsDto } from "./dto/CreateUserSettings.dto";
import { UpdateUserSettingsDto } from "./dto/UpdateUserSettings.dto";

@Injectable()
export class UserSettingsService {
    constructor(@InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>) {}

    getUserSettings() {    
        return this.userSettingsModel.find();
    }

    getUserSettingById(id: string) {
        return this.userSettingsModel.findById(id);
    }

    async createUserSettings(createUserSettingsDto: CreateUserSettingsDto) {
        const createdUserSettings = new this.userSettingsModel(createUserSettingsDto);
        return createdUserSettings.save();
    }

    updateUserSettings(id: string, updateUserSettingsDto: UpdateUserSettingsDto) {
        return this.userSettingsModel.findByIdAndUpdate (id, updateUserSettingsDto, { new: true });
    }  
    
    deleteUserSettings(id: string) {
        return this.userSettingsModel.findByIdAndDelete(id);
    }
}