import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustsFloor1556002584308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "floors" ADD "floorFile" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "floors" DROP COLUMN "floorFile"`);
    }

}
