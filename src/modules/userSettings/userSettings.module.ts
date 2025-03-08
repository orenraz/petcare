import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSettings, UserSettingsSchema } from 'src/schemas/UserSettings.schema';
import { UserSettingsService } from './userSettings.service';
import { UserSettingsController } from './userSettings.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserSettings.name,
                schema: UserSettingsSchema,
            },
        ]),
    ],
    providers: [
        UserSettingsService
    ],
    controllers: [
        UserSettingsController
    ],
  
})
export class UserSettingsModule {}
