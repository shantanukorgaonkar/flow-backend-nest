import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { QuestionEntity } from "./question.entity";
import { FrameworkEntity } from "./framework.entity";
import { EntityMapper } from "../common/base.entity";
import { BaseModel } from "src/common/base.model";
import { FrameworkModel } from "src/domain/models/framework.model";
import { FrameworkQuestionModel } from "src/domain/models/framework-question.model";
import { framework_question_entity } from "@prisma/client";

export class FrameworkQuestionEntity implements framework_question_entity, EntityMapper<FrameworkQuestionModel> {

    id!: string;

    order!: number;

    question!: QuestionEntity;

    questionId!: string | null;

    framework!: FrameworkEntity;
    
    frameworkId!: string | null;

    copy(model: FrameworkQuestionModel) {
        this.id = model.id;
        this.order = model.order;
        this.question = model.question as QuestionEntity;
        this.framework = model.framework as FrameworkEntity;
        return this;
    }

    toModel(): FrameworkQuestionModel {
        const model = new FrameworkQuestionModel();
        model.id = this.id;
        model.order = this.order;
        model.question = this.question;
        model.framework = this.framework;
        return model;
    }

}
