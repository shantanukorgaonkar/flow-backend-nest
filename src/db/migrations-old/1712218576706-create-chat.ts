import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChatMigrations1712218576706 implements MigrationInterface {
    name = 'CreateChatMigrations1712218576706'


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."raw_code_entity_type_enum" AS ENUM('python', 'javascript', 'typescript', 'java', 'default')`);
        await queryRunner.query(`CREATE TABLE "raw_code_entity" ("id" SERIAL NOT NULL, "type" "public"."raw_code_entity_type_enum" NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "parentId" character varying NOT NULL, CONSTRAINT "PK_bcc6b35ccdf3681d26fe1f439c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_thread_entity" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_501aba143a4e135ad0ab3520462" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."chat_message_entity_type_enum" AS ENUM('USER_TEXT_MESSAGE', 'MODEL_TEXT_MESSAGE', 'MODEL_CODE_MESSAGE')`);
        await queryRunner.query(`CREATE TABLE "chat_message_entity" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "type" "public"."chat_message_entity_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "threadId" character varying NOT NULL, CONSTRAINT "PK_b89f870955203ec654e2591f3e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_text_message_entity" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "threadId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentId" character varying NOT NULL, CONSTRAINT "PK_b8733350b0f9b601641ed22567f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_model_code_message_entity" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "threadId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentId" character varying NOT NULL, CONSTRAINT "PK_4ee037a19c846698493c8824247" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat_model_code_message_entity"`);
        await queryRunner.query(`DROP TABLE "chat_text_message_entity"`);
        await queryRunner.query(`DROP TABLE "chat_message_entity"`);
        await queryRunner.query(`DROP TYPE "public"."chat_message_entity_type_enum"`);
        await queryRunner.query(`DROP TABLE "chat_thread_entity"`);
        await queryRunner.query(`DROP TABLE "raw_code_entity"`);
        await queryRunner.query(`DROP TYPE "public"."raw_code_entity_type_enum"`);
    }


}
