import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { JournalEntryEntity } from "./journal-entry.entity";
import { EntityMapper } from "../common/base.entity";
import { SessionModel } from "src/domain/models/session.model";
import { session_entity as SessionEntitySchema } from "@prisma/client";

@Entity()
export class SessionEntity implements SessionEntitySchema, EntityMapper<SessionModel> {
    id!: string;

    startTime!: Date;

    endTime!: Date;

    userId!: number | null;
    
    user?: UserEntity;

    journalEntries?: JournalEntryEntity[];

    copy(model: SessionModel) {
        this.id = model.id;
        this.startTime = model.startTime;
        this.endTime = model.endTime;
        this.user = model.user as UserEntity;
        this.journalEntries = model.journalEntries as JournalEntryEntity[];
        return this;
    }

    toModel(): SessionModel {
        const model = new SessionModel();
        model.id = this.id;
        model.startTime = this.startTime;
        model.endTime = this.endTime;
        model.user = this.user;
        model.journalEntries = this.journalEntries;
        return model;
    }
}
