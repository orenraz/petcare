import { IsBoolean, IsOptional } from "class-validator";

export class CreateUserSettingsDto {
    @IsBoolean()
    @IsOptional()
    recieveNotifications?: boolean;
    
    @IsBoolean()
    @IsOptional()
    lastRecieveEmails?: boolean;
    
    @IsBoolean()
    @IsOptional()
    recieveSMS?: boolean;
}