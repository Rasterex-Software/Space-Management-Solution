import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustSchema1553788669473 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "surface"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "surface" numeric NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "surface"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "surface" integer NOT NULL`);
    }

}
