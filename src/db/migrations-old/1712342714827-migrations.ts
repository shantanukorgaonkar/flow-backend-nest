import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712342714827 implements MigrationInterface {
    name = 'Migrations1712342714827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ADD "index" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" ADD "length" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "raw_code_entity" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "raw_code_entity" DROP COLUMN "index"`);
    }

}
