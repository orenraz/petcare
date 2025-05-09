import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class UserSettings {
    @Prop({ required: false })
    recieveNotifications?: boolean;

    @Prop({ required: false })
    recieveEmails?: boolean;

    @Prop({ required: false })
    recieveSMS?: boolean;
}   

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);