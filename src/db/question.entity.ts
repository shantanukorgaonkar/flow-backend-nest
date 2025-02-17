import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FrameworkQuestionEntity } from "./framework-question.entity";
import { JournalEntryEntity } from "./journal-entry.entity";
import { QuestionModel } from "../domain/models/question.model";
import { EntityMapper } from "../common/base.entity";
import { question_entity as QuestionEntitySchema } from "@prisma/client";

@Entity()
export class QuestionEntity implements QuestionEntitySchema, EntityMapper<QuestionModel> {
    id!: string;

    question!: string;

    hint!: string;

    frameworkQuestions?: FrameworkQuestionEntity[];

    journalEntries?: JournalEntryEntity[];

    // //Model to EntityMapper
    // static from(user: QuestionModel): QuestionEntity {
    //     const { id, question, hint } = user;
    //     const userEntity = new QuestionEntity();
    //     userEntity.id = id;
    //     userEntity.question = question;
    //     userEntity.hint = hint;
    //     return userEntity;
    // }

    // //Entity to ModelMapper
    // toModel(): QuestionModel {
    //     return {
    //         id: this.id,
    //         question: this.question,
    //         hint: this.hint
    //     }
    // }

    copy(model: QuestionModel) {
        this.id = model.id;
        this.question = model.question;
        this.hint = model.hint;
        return this;
    }

    toModel(): QuestionModel {
        const model = new QuestionModel();
        model.id = this.id;
        model.question = this.question;
        model.hint = this.hint;
        return model;
    }
}
