import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/base.service";
import { QuestionEntity } from "src/db/question.entity";
import { QuestionModel } from "src/domain/models/question.model";
import { Repository } from "typeorm";

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionModel> {

    constructor(
        @InjectRepository(QuestionEntity)
        userRepository: Repository<QuestionEntity>
    ) {
        super(userRepository, QuestionEntity);
    }

}