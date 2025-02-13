import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FrameworkEntity } from "../db/framework.entity";
import { FrameworkController } from "./framework.controller";
import { FrameworkService } from "./framework.service";

@Module({
    imports: [TypeOrmModule.forFeature([FrameworkEntity])],
    providers: [FrameworkService],
    controllers: [FrameworkController],
    exports: [FrameworkService]
})
export class FrameworkModule {}
