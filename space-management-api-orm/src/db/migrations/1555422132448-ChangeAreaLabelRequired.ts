import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeAreaLabelRequired1555422132448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "label" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "vectorBlockIndex" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "vectorBlockIndex" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "label" DROP DEFAULT`);
    }

}
