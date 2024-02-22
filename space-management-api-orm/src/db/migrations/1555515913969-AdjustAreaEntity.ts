import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustAreaEntity1555515913969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "areas_type_enum"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "vectorBlockIndex"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "floorFile"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "surface"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ADD "surface" numeric NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "floorFile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "vectorBlockIndex" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`CREATE TYPE "areas_type_enum" AS ENUM('common', 'rentable')`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "type" "areas_type_enum" NOT NULL DEFAULT 'common'`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "description" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "label" character varying(100) NOT NULL DEFAULT ''`);
    }

}
