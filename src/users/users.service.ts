import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../db/user.entity";
import { UserModel } from "../domain/models/user.model";
import { In, Repository } from "typeorm";
import * as argon from 'argon2';
import { BaseService } from "../common/base.service";

@Injectable()
export class UserService extends BaseService<UserEntity, UserModel> {
    constructor(
        @InjectRepository(UserEntity)
        userRepository: Repository<UserEntity>
    ) {
        super(userRepository, UserEntity);
    }

    async create(user: UserModel): Promise<UserEntity> {
        const hash = await argon.hash(user.password);
        user.password = hash;
        return super.create(user);
    }

    async findManyByIds(ids: number[]): Promise<UserModel[]> {
        const entities = await this.repository.findBy({ id: In(ids) });
        return entities.map(entity => entity.toModel());
    }

}
