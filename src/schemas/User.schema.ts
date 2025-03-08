import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./UserSettings.schema";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    firstName: string;
    
    @Prop({ required: false })
    lastName?: string;
    
    @Prop({ required: false, unique: true})
    email?: string;
    
    @Prop({ required: true })
    passwordHash: string;
    
    @Prop({ type: String, enum: Object.values(UserRole), required: true })
    role: UserRole;

    @Prop({ type: Date, default: Date.now, required: true })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now, required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings', required: false })
    settings?: UserSettings;
}

// Generate the Mongoose Schema
export const UserSchema = SchemaFactory.createForClass(User);