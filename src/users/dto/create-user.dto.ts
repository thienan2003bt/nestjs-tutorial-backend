import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['ACTIVE', 'INACTIVE'], { message: 'Valid status required!' })
    status: 'ACTIVE' | 'INACTIVE';
}
