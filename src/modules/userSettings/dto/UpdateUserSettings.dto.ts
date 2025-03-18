import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserSettingsDto {
    @IsBoolean()
    @IsOptional()   
    recieveNotifications?: boolean;
    
    @IsBoolean()
    @IsOptional()
    recieveEmails?: boolean;
    
    @IsBoolean()
    @IsOptional()
    recieveSMS?: boolean;
}