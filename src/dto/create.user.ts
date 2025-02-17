import { IsEmail, IsNumberString, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { UserModel, UserType } from "../domain/models/user.model";
import { BaseDto } from "../common/base.dto";

export class CreateUserDto implements BaseDto {
    @IsEmail()
    email!: string;

    @IsNumberString()
    @IsPhoneNumber()
    phoneNumber!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    toModel(): UserModel {
        const model = new UserModel()
        model.email = this.email;
        model.phoneNumber = this.phoneNumber;
        model.password = this.password;
        return model
    }
}