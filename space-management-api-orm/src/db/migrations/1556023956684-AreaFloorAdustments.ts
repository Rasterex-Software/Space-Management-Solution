import {MigrationInterface, QueryRunner} from "typeorm";

export class AreaFloorAdustments1556023956684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_0a0ae3e7c640e17dd1b640ae771"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "floorId"`);
        await queryRunner.query(`ALTER TABLE "floors" ADD CONSTRAINT "UQ_77dded00a79179f33eba2c62813" UNIQUE ("floorFile")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "floors" DROP CONSTRAINT "UQ_77dded00a79179f33eba2c62813"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD "floorId" integer`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_0a0ae3e7c640e17dd1b640ae771" FOREIGN KEY ("floorId") REFERENCES "floors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
