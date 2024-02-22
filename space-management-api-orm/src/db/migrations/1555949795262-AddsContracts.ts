import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsContracts1555949795262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_a40cb13177a9b0841a5af2a6fc8"`);
        await queryRunner.query(`ALTER TABLE "areas" RENAME COLUMN "tenantId" TO "contractId"`);
        await queryRunner.query(`CREATE TABLE "contracts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "label" character varying(100) NOT NULL DEFAULT '', "type" character varying(100) NOT NULL DEFAULT '', "description" text NOT NULL DEFAULT '', "startDate" TIMESTAMP, "endDate" TIMESTAMP, "tenantId" integer, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_4317b3172f8e20198732e698e12" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_4f1cebbd53d4cff5e7150ea07ea" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_4f1cebbd53d4cff5e7150ea07ea"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_4317b3172f8e20198732e698e12"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
        await queryRunner.query(`ALTER TABLE "areas" RENAME COLUMN "contractId" TO "tenantId"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_a40cb13177a9b0841a5af2a6fc8" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
