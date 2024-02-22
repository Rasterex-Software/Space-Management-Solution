import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTenantColor1553362051497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tenants" ADD "color" character varying(30) NOT NULL DEFAULT 'rgba(150,150,150,0.5)'`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" SET DEFAULT null`);
        await queryRunner.query(`
            UPDATE "tenants" SET "color"='rgba(225,190,231,0.5)' WHERE "id"=1;
            UPDATE "tenants" SET "color"='rgba(81,45,168,0.5)' WHERE "id"=2;
            UPDATE "tenants" SET "color"='rgba(100,181,246,0.5)' WHERE "id"=3;
            UPDATE "tenants" SET "color"='rgba(41,182,246,0.5)' WHERE "id"=4;
            UPDATE "tenants" SET "color"='rgba(2,119,189,0.5)' WHERE "id"=5;
            UPDATE "tenants" SET "color"='rgba(0,131,143,0.5)' WHERE "id"=6;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "color"`);
    }

}
