import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { QuestionEntity } from "../db/question.entity";
import { SessionEntity } from "../db/session.entity";
import { EntityMapper } from "../common/base.entity";
import { JournalEntryModel } from "src/domain/models/journal-entry.model";
import { journal_entry_entity } from "@prisma/client";

export class JournalEntryEntity implements journal_entry_entity, EntityMapper<JournalEntryModel> {
    id!: string;

    entry!: string;

    user?: UserEntity;

    userId!: number | null;

    question?: QuestionEntity;

    questionId!: string | null;

    session?: SessionEntity;
    sessionId!: string | null;

    copy(model: JournalEntryModel) {
        this.id = model.id;
        this.entry = model.entry;
        this.user = model.user as UserEntity;
        this.question = model.question as QuestionEntity;
        this.session = model.session as SessionEntity;
        return this;
    }

    toModel(): JournalEntryModel {
        const model = new JournalEntryModel();
        model.id = this.id;
        model.entry = this.entry;
        model.user = this.user;
        model.question = this.question;
        model.session = this.session;
        return model;
    }
}
