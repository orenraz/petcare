import { UserRole } from "src/schemas/User.schema";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}