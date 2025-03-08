import { UserRole } from "src/schemas/User.schema";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserSettingsDto } from "src/modules/userSettings/dto/CreateUserSettings.dto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsString()
    @IsOptional()
    lastName?: string;
    
    @IsString()
    @IsOptional()
    email?: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @ValidateNested()
    settings?: CreateUserSettingsDto;

}