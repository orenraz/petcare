import { UserRole } from "src/schemas/User.schema";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsString()
    lastName?: string;
    
    @IsString()
    email?: string;
    
    @IsNotEmpty()
    @IsString()
    password: number;
    
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

}