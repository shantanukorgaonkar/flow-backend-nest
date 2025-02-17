import { user_entity as UserSchema } from '@prisma/client';
import { EntityMapper } from "../common/base.entity";
import { UserModel, UserType } from "../domain/models/user.model";

export class UserEntity implements UserSchema, EntityMapper<UserModel> {

    id!: number;

    email!: string;

    password!: string;

    phoneNumber!: string;

    userType!: UserType;

    otp!: number

    createdAt!: Date;

    updatedAt!: Date;

    deletedDate!: Date


    //Model to EntityMapper
    static from(user: UserModel): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id;
        entity.email = user.email;
        entity.password = user.password;
        entity.phoneNumber = user.phoneNumber;
        entity.userType = user.userType;
        entity.createdAt = user.createdAt;
        entity.updatedAt = user.updatedAt;
        return entity;
    }

    //Entity to ModelMapper
    toUserModel(): UserModel {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            userType: this.userType,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    copy(model: UserModel) {
        this.id = model.id;
        this.email = model.email;
        this.password = model.password;
        this.phoneNumber = model.phoneNumber;
        this.userType = model.userType;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
        return this;
    }

    toModel(): UserModel {
        const model = new UserModel();
        model.id = this.id;
        model.email = this.email;
        model.password = this.password;
        model.phoneNumber = this.phoneNumber;
        model.userType = this.userType;
        model.createdAt = this.createdAt;
        model.updatedAt = this.updatedAt;
        return model;
    }
}