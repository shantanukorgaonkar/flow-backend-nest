import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FrameworkQuestionEntity } from "./framework-question.entity";
import { JournalEntryEntity } from "./journal-entry.entity";
import { QuestionModel } from "../domain/models/question.model";
import { EntityMapper } from "../common/base.entity";

@Entity()
export class QuestionEntity implements EntityMapper<QuestionModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    question: string;

    @Column()
    hint: string;

    @OneToMany(() => FrameworkQuestionEntity, (frameworkQuestion) => frameworkQuestion.question)
    frameworkQuestions: FrameworkQuestionEntity[];

    @OneToMany(() => JournalEntryEntity, (entry) => entry.question)
    journalEntries: JournalEntryEntity[];
    
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
