import {MigrationInterface, QueryRunner} from "typeorm";

export class ConvertAreaIdToUuid1555444827591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "PK_5110493f6342f34c978c084d0d6"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "PK_5110493f6342f34c978c084d0d6"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id")`);
    }

}
