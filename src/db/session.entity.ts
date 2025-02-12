import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { JournalEntryEntity } from "./journal-entry.entity";
import { EntityMapper } from "../common/base.entity";
import { SessionModel } from "src/domain/models/session.model";

@Entity()
export class SessionEntity implements EntityMapper<SessionModel> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(() => UserEntity, (user) => user.sessions)
    user: UserEntity;

    @OneToMany(() => JournalEntryEntity, (entry) => entry.session)
    journalEntries: JournalEntryEntity[];

    copy(model: SessionModel) {
        this.id = model.id;
        this.startTime = model.startTime;
        this.endTime = model.endTime;
        this.user = model.user as UserEntity;
        return this;
    }

    toModel(): SessionModel {
        const model = new SessionModel();
        model.id = this.id;
        model.startTime = this.startTime;
        model.endTime = this.endTime;
        model.user = this.user;
        return model;
    }
}
