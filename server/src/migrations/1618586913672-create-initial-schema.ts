import {MigrationInterface, QueryRunner} from "typeorm";

export class createInitialSchema1618586913672 implements MigrationInterface {
    name = 'createInitialSchema1618586913672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cheatsheet_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "index" integer NOT NULL, CONSTRAINT "PK_741c7fed00cfbebb1da05f10d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keybind" ("id" SERIAL NOT NULL, "cheatsheetId" integer NOT NULL, "categoryId" integer NOT NULL, "name" character varying NOT NULL, "keyCombination" character varying NOT NULL, "description" character varying NOT NULL, "likes" integer NOT NULL, "cheatsheetCategoryId" integer, CONSTRAINT "PK_9a17e61e064839687b8abb38a69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cheatsheet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logoUrl" character varying NOT NULL, CONSTRAINT "PK_21111d62d038f0986adb2d693ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "keybind" ADD CONSTRAINT "FK_8869656c56a6c755d0214646fa1" FOREIGN KEY ("cheatsheetId") REFERENCES "cheatsheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "keybind" ADD CONSTRAINT "FK_f6a4bd5ae6301a9f1fb176b7420" FOREIGN KEY ("cheatsheetCategoryId") REFERENCES "cheatsheet_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keybind" DROP CONSTRAINT "FK_f6a4bd5ae6301a9f1fb176b7420"`);
        await queryRunner.query(`ALTER TABLE "keybind" DROP CONSTRAINT "FK_8869656c56a6c755d0214646fa1"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cheatsheet"`);
        await queryRunner.query(`DROP TABLE "keybind"`);
        await queryRunner.query(`DROP TABLE "cheatsheet_category"`);
    }

}
