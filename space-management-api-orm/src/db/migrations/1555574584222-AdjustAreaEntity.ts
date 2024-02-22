import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustAreaEntity1555574584222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ADD "floorFile" character varying`);
        await queryRunner.query(`UPDATE "areas" SET "floorFile"=''`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "floorFile" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "floorFile"`);
    }

}
