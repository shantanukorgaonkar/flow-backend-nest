import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/user.entity";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}