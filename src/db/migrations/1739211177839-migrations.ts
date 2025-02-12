import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739211177839 implements MigrationInterface {
    name = 'Migrations1739211177839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "raw_code_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "code" varchar NOT NULL, "description" varchar NOT NULL, "index" integer NOT NULL, "length" integer NOT NULL, "parentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "chat_thread_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer)`);
        await queryRunner.query(`CREATE TABLE "chat_message_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "timestamp" datetime NOT NULL, "type" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "threadId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "chat_text_message_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "threadId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "parentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "chat_model_code_message_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "threadId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "parentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "phoneNumber" varchar NOT NULL, "userType" varchar NOT NULL, "otp" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedDate" datetime, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_2938f63524060140bbc0dd20f78" UNIQUE ("password"), CONSTRAINT "UQ_d32231375a97904922ddad3eaff" UNIQUE ("phoneNumber"))`);
        await queryRunner.query(`CREATE TABLE "temporary_chat_thread_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer, CONSTRAINT "FK_254e85693fe2728266e6f4b35b2" FOREIGN KEY ("authorId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_chat_thread_entity"("id", "description", "timestamp", "createdAt", "updatedAt", "authorId") SELECT "id", "description", "timestamp", "createdAt", "updatedAt", "authorId" FROM "chat_thread_entity"`);
        await queryRunner.query(`DROP TABLE "chat_thread_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_chat_thread_entity" RENAME TO "chat_thread_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_thread_entity" RENAME TO "temporary_chat_thread_entity"`);
        await queryRunner.query(`CREATE TABLE "chat_thread_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "timestamp" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "authorId" integer)`);
        await queryRunner.query(`INSERT INTO "chat_thread_entity"("id", "description", "timestamp", "createdAt", "updatedAt", "authorId") SELECT "id", "description", "timestamp", "createdAt", "updatedAt", "authorId" FROM "temporary_chat_thread_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_chat_thread_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "chat_model_code_message_entity"`);
        await queryRunner.query(`DROP TABLE "chat_text_message_entity"`);
        await queryRunner.query(`DROP TABLE "chat_message_entity"`);
        await queryRunner.query(`DROP TABLE "chat_thread_entity"`);
        await queryRunner.query(`DROP TABLE "raw_code_entity"`);
    }

}
