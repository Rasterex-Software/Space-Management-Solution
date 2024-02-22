import {MigrationInterface, QueryRunner} from "typeorm";

export class FileEntity1557758775694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isPrepared" boolean NOT NULL DEFAULT false, "hierarchyPath" text NOT NULL DEFAULT '', "layerState" text NOT NULL DEFAULT '', "rotationState" text NOT NULL DEFAULT '', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_332d10755187ac3c580e21fbc02" UNIQUE ("name"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "floors" ADD "fileId" integer`);
        await queryRunner.query(`ALTER TABLE "floors" ADD CONSTRAINT "UQ_be062d442ffe31fcedf2e88c6f1" UNIQUE ("fileId")`);
        await queryRunner.query(`ALTER TABLE "floors" ADD CONSTRAINT "FK_be062d442ffe31fcedf2e88c6f1" FOREIGN KEY ("fileId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "floors" DROP CONSTRAINT "FK_be062d442ffe31fcedf2e88c6f1"`);
        await queryRunner.query(`ALTER TABLE "floors" DROP CONSTRAINT "UQ_be062d442ffe31fcedf2e88c6f1"`);
        await queryRunner.query(`ALTER TABLE "floors" DROP COLUMN "fileId"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
