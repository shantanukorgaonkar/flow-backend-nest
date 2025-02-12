import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionService } from "./questions.service";
import { QuestionController } from "./questions.controller";
import { QuestionEntity } from "../db/question.entity";

@Module({
    imports: [TypeOrmModule.forFeature([QuestionEntity])],
    providers: [QuestionService],
    controllers: [QuestionController],
    exports: [QuestionService]
})
export class QuestionModule {}