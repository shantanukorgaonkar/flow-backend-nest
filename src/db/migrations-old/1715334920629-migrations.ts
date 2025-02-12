import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1715334920629 implements MigrationInterface {
    name = 'Migrations1715334920629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_entity_usertype_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "userType" "public"."user_entity_usertype_enum" NOT NULL, "otp" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_2938f63524060140bbc0dd20f78" UNIQUE ("password"), CONSTRAINT "UQ_d32231375a97904922ddad3eaff" UNIQUE ("phoneNumber"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_thread_entity" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ALTER COLUMN "index" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ALTER COLUMN "length" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "chat_thread_entity" ADD CONSTRAINT "FK_254e85693fe2728266e6f4b35b2" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_thread_entity" DROP CONSTRAINT "FK_254e85693fe2728266e6f4b35b2"`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ALTER COLUMN "length" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ALTER COLUMN "index" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "chat_thread_entity" DROP COLUMN "authorId"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_entity_usertype_enum"`);
    }

}
