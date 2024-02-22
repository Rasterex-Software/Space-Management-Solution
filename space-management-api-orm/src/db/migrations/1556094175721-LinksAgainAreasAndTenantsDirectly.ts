import {MigrationInterface, QueryRunner} from "typeorm";

export class LinksAgainAreasAndTenantsDirectly1556094175721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_a40cb13177a9b0841a5af2a6fc8" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_a40cb13177a9b0841a5af2a6fc8"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "tenantId"`);
    }

}
