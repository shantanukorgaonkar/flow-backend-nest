import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739279667924 implements MigrationInterface {
    name = 'Migrations1739279667924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "framework_entity" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "framework_question_entity" ("id" varchar PRIMARY KEY NOT NULL, "order" integer NOT NULL, "questionId" varchar, "frameworkId" varchar)`);
        await queryRunner.query(`CREATE TABLE "question_entity" ("id" varchar PRIMARY KEY NOT NULL, "question" varchar NOT NULL, "hint" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar)`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_framework_question_entity" ("id" varchar PRIMARY KEY NOT NULL, "order" integer NOT NULL, "questionId" varchar, "frameworkId" varchar, CONSTRAINT "FK_beee4c9f590c5f5c8e05c03cc00" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_febb563d43b6224722353876ea4" FOREIGN KEY ("frameworkId") REFERENCES "framework_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_framework_question_entity"("id", "order", "questionId", "frameworkId") SELECT "id", "order", "questionId", "frameworkId" FROM "framework_question_entity"`);
        await queryRunner.query(`DROP TABLE "framework_question_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_framework_question_entity" RENAME TO "framework_question_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar, CONSTRAINT "FK_b9b7b635b80e6b679370f2c5fc6" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_26dc26b40a8e1ba833eae8eac40" FOREIGN KEY ("questionId") REFERENCES "question_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6170acbded830663cc81feb855" FOREIGN KEY ("sessionId") REFERENCES "session_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId") SELECT "id", "entry", "userId", "questionId", "sessionId" FROM "journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_journal_entry_entity" RENAME TO "journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer, CONSTRAINT "FK_8118675718bebb455bba4caf129" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_session_entity"("id", "startTime", "endTime", "userId") SELECT "id", "startTime", "endTime", "userId" FROM "session_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_session_entity" RENAME TO "session_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_entity" RENAME TO "temporary_session_entity"`);
        await queryRunner.query(`CREATE TABLE "session_entity" ("id" varchar PRIMARY KEY NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "session_entity"("id", "startTime", "endTime", "userId") SELECT "id", "startTime", "endTime", "userId" FROM "temporary_session_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_session_entity"`);
        await queryRunner.query(`ALTER TABLE "journal_entry_entity" RENAME TO "temporary_journal_entry_entity"`);
        await queryRunner.query(`CREATE TABLE "journal_entry_entity" ("id" varchar PRIMARY KEY NOT NULL, "entry" varchar NOT NULL, "userId" integer, "questionId" varchar, "sessionId" varchar)`);
        await queryRunner.query(`INSERT INTO "journal_entry_entity"("id", "entry", "userId", "questionId", "sessionId") SELECT "id", "entry", "userId", "questionId", "sessionId" FROM "temporary_journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_journal_entry_entity"`);
        await queryRunner.query(`ALTER TABLE "framework_question_entity" RENAME TO "temporary_framework_question_entity"`);
        await queryRunner.query(`CREATE TABLE "framework_question_entity" ("id" varchar PRIMARY KEY NOT NULL, "order" integer NOT NULL, "questionId" varchar, "frameworkId" varchar)`);
        await queryRunner.query(`INSERT INTO "framework_question_entity"("id", "order", "questionId", "frameworkId") SELECT "id", "order", "questionId", "frameworkId" FROM "temporary_framework_question_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_framework_question_entity"`);
        await queryRunner.query(`DROP TABLE "session_entity"`);
        await queryRunner.query(`DROP TABLE "journal_entry_entity"`);
        await queryRunner.query(`DROP TABLE "question_entity"`);
        await queryRunner.query(`DROP TABLE "framework_question_entity"`);
        await queryRunner.query(`DROP TABLE "framework_entity"`);
    }

}
