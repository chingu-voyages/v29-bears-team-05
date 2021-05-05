import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1620170143113 implements MigrationInterface {
  name = 'InitialSchema1620170143113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cheatsheet_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "index" integer NOT NULL, CONSTRAINT "PK_741c7fed00cfbebb1da05f10d58" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "keybind" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "keyCombination" character varying NOT NULL, "description" character varying(300) NOT NULL, "likes" integer NOT NULL DEFAULT '0', "cheatsheetId" uuid, "cheatsheetCategoryId" uuid, CONSTRAINT "PK_9a17e61e064839687b8abb38a69" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "cheatsheet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(300) NOT NULL, "logoUrl" character varying, CONSTRAINT "PK_21111d62d038f0986adb2d693ab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_user_favorites_keybind" ("userId" uuid NOT NULL, "keybindId" uuid NOT NULL, CONSTRAINT "PK_9e1056484eee5422e37615fb2e3" PRIMARY KEY ("userId", "keybindId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5931251cf736ef2356f842920" ON "user_user_favorites_keybind" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_64089387389aca43fdad4c18d0" ON "user_user_favorites_keybind" ("keybindId") `
    );
    await queryRunner.query(
      `ALTER TABLE "keybind" ADD CONSTRAINT "FK_8869656c56a6c755d0214646fa1" FOREIGN KEY ("cheatsheetId") REFERENCES "cheatsheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "keybind" ADD CONSTRAINT "FK_f6a4bd5ae6301a9f1fb176b7420" FOREIGN KEY ("cheatsheetCategoryId") REFERENCES "cheatsheet_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_favorites_keybind" ADD CONSTRAINT "FK_b5931251cf736ef2356f8429200" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_favorites_keybind" ADD CONSTRAINT "FK_64089387389aca43fdad4c18d03" FOREIGN KEY ("keybindId") REFERENCES "keybind"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_user_favorites_keybind" DROP CONSTRAINT "FK_64089387389aca43fdad4c18d03"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_user_favorites_keybind" DROP CONSTRAINT "FK_b5931251cf736ef2356f8429200"`
    );
    await queryRunner.query(
      `ALTER TABLE "keybind" DROP CONSTRAINT "FK_f6a4bd5ae6301a9f1fb176b7420"`
    );
    await queryRunner.query(
      `ALTER TABLE "keybind" DROP CONSTRAINT "FK_8869656c56a6c755d0214646fa1"`
    );
    await queryRunner.query(`DROP INDEX "IDX_64089387389aca43fdad4c18d0"`);
    await queryRunner.query(`DROP INDEX "IDX_b5931251cf736ef2356f842920"`);
    await queryRunner.query(`DROP TABLE "user_user_favorites_keybind"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "cheatsheet"`);
    await queryRunner.query(`DROP TABLE "keybind"`);
    await queryRunner.query(`DROP TABLE "cheatsheet_category"`);
  }
}
