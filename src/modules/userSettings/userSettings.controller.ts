import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import mongoose from "mongoose";
import { UserSettingsService } from "./userSettings.service";
import { CreateUserSettingsDto } from "./dto/CreateUserSettings.dto";
import { UpdateUserSettingsDto } from "./dto/UpdateUserSettings.dto";

@Controller('userSettings')
export class UserSettingsController{
    constructor(private userSettingsService: UserSettingsService) {}

    @Get()
    getUserSettings() {
        return this.userSettingsService.getUserSettings();
    }

    @Get(':id')
    async getUserSettingsById(@Param('id') id: string) {
        // TODO: move this to a middleware
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const findUserSetting = await this.userSettingsService.getUserSettingById(id);
        if (!findUserSetting) throw new HttpException('User Setting not found', 404);
        
        return findUserSetting;
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    createUserSettings(@Body() createUserSettingsDto: CreateUserSettingsDto) {
        return this.userSettingsService.createUserSettings(createUserSettingsDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateSettings(@Param('id') id: string, @Body() updateUserSettingsDto: UpdateUserSettingsDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const updateUserSettings = await this.userSettingsService.updateUserSettings(id, updateUserSettingsDto);
        if (!updateUserSettings) throw new HttpException('User Settings not found', 404);
        return updateUserSettings;
    }

    @Delete(':id')
    async deleteUserSettings(@Param('id') id: string) {       
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid id', 400);

        const deletedUserSettings = await this.userSettingsService.deleteUserSettings(id);
        if (!deletedUserSettings) throw new HttpException('User Settings not found', 404);
        return deletedUserSettings;
    }
}