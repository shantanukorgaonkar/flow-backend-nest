import { IsEmail, IsNumberString, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { UserModel, UserType } from "../domain/models/user.model";
import { BaseDto } from "../common/base.dto";

export class LoginUserDto implements BaseDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

}