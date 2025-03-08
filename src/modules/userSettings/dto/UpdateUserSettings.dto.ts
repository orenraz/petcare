import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserSettingsDto {
    @IsBoolean()
    @IsString()
    recieveNotifications?: boolean;
    
    @IsBoolean()
    @IsOptional()
    lastRecieveEmails?: boolean;
    
    @IsBoolean()
    @IsOptional()
    recieveSMS?: boolean;
}