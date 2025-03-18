import { IsBoolean, IsOptional } from "class-validator";

export class CreateUserSettingsDto {
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