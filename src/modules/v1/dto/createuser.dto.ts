import { IsOptional, IsMobilePhone, IsString, Length, IsNumber } from 'class-validator';


export class CreateUserDto {
    @IsString()
    name: string;
    @IsNumber()
    mobileNo: number;
    @IsNumber()
    mobileCode: number;
    @IsString()
    @IsOptional()
    email: string;
    @IsString()
    gender: string;
    @IsString()
    password: string;
    @IsOptional()
    @IsString()
    role: string;
}
