import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserModel, UserType } from "../domain/models/user.model";
import { SessionEntity } from "../db/session.entity";
import { JournalEntryEntity } from "../db/journal-entry.entity";
import { EntityMapper } from "../common/base.entity";

@Entity()
export class UserEntity implements EntityMapper<UserModel> {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    password: string;

    @Column({unique:true})
    phoneNumber: string;

    @Column({ type: 'varchar'})
    userType: UserType;

    @Column({ type: "int", nullable: true, default: null})
    otp: number

    @OneToMany(() => SessionEntity, (session) => session.user)
    sessions: SessionEntity[];

    @OneToMany(() => JournalEntryEntity, (entry) => entry.user)
    journalEntries: JournalEntryEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedDate: Date
    

    //Model to EntityMapper
    static from(user: UserModel): UserEntity {
        const entity = new UserEntity();
        entity.id = user.id;
        entity.email = user.email;
        entity.password = user.password;
        entity.phoneNumber = user.phoneNumber;
        entity.userType = user.userType;
        entity.createdAt = user.createdAt;
        entity.updatedAt = user.updatedAt;
        return entity;
    }

    //Entity to ModelMapper
    toUserModel(): UserModel {
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            phoneNumber: this.phoneNumber,
            userType: this.userType,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    copy(model: UserModel) {
        this.id = model.id;
        this.email = model.email;
        this.password = model.password;
        this.phoneNumber = model.phoneNumber;
        this.userType = model.userType;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
        return this;
    }

    toModel(): UserModel {
        const model = new UserModel();
        model.id = this.id;
        model.email = this.email;
        model.password = this.password;
        model.phoneNumber = this.phoneNumber;
        model.userType = this.userType;
        model.createdAt = this.createdAt;
        model.updatedAt = this.updatedAt;
        return model;
    }
}