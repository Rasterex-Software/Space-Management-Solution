import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeVectorBlockIndexType1554914649956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "vectorBlockIndex"`);
        // await queryRunner.query(`ALTER TABLE "areas" ADD "vectorBlockIndex" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "vectorBlockIndex" TYPE character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "vectorBlockIndex"`);
        // await queryRunner.query(`ALTER TABLE "areas" ADD "vectorBlockIndex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "vectorBlockIndex" TYPE INT USING "vectorBlockIndex":integer`);
    }

}
