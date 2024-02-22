import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatesSpaceHierarchy1556001873602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_5ab26402699477bf5d03c6834be"`);
        await queryRunner.query(`ALTER TABLE "areas" RENAME COLUMN "treeNodeId" TO "floorId"`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "label" character varying(100) NOT NULL, "description" text NOT NULL DEFAULT '', CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "label" character varying(100) NOT NULL, "description" text NOT NULL DEFAULT '', "countryId" integer, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buildings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "label" character varying(100) NOT NULL, "description" text NOT NULL DEFAULT '', "regionId" integer, CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "floors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "label" character varying(100) NOT NULL, "description" text NOT NULL DEFAULT '', "buildingId" integer, CONSTRAINT "PK_dae78234002afa84842d3a08ee0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "space_nodes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "fileName" character varying(100) DEFAULT '', "parentId" integer, CONSTRAINT "PK_4f08d4bf3b0abea55db0aa1a1d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "space_nodes_closure" ("ancestor" integer NOT NULL, "descendant" integer NOT NULL, "level" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_5ad2cd4b77a26b3aa85827837a3" PRIMARY KEY ("ancestor", "descendant"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5ad2cd4b77a26b3aa85827837a" ON "space_nodes_closure" ("ancestor", "descendant") `);
        await queryRunner.query(`DELETE FROM "tree_nodes_closure"`);
        await queryRunner.query(`DELETE FROM "tree_nodes"`);
        await queryRunner.query(`ALTER TABLE "tree_nodes" ALTER COLUMN "level" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" ALTER COLUMN "level" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "regions" ADD CONSTRAINT "FK_449a1b5dc2cb097bb2783f60cde" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buildings" ADD CONSTRAINT "FK_b46f7edfe320f50875f521d6f22" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "floors" ADD CONSTRAINT "FK_58ed6d6bd6268cdf83b7c72d1b5" FOREIGN KEY ("buildingId") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_0a0ae3e7c640e17dd1b640ae771" FOREIGN KEY ("floorId") REFERENCES "floors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "space_nodes" ADD CONSTRAINT "FK_664e096c01f1899656bffb8b670" FOREIGN KEY ("parentId") REFERENCES "space_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "space_nodes_closure" ADD CONSTRAINT "FK_4bfa9e2e448970f1e6dcb102e78" FOREIGN KEY ("ancestor") REFERENCES "space_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "space_nodes_closure" ADD CONSTRAINT "FK_2ebc93d3f26f06f13ae5c26c955" FOREIGN KEY ("descendant") REFERENCES "space_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "space_nodes_closure" DROP CONSTRAINT "FK_2ebc93d3f26f06f13ae5c26c955"`);
        await queryRunner.query(`ALTER TABLE "space_nodes_closure" DROP CONSTRAINT "FK_4bfa9e2e448970f1e6dcb102e78"`);
        await queryRunner.query(`ALTER TABLE "space_nodes" DROP CONSTRAINT "FK_664e096c01f1899656bffb8b670"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_0a0ae3e7c640e17dd1b640ae771"`);
        await queryRunner.query(`ALTER TABLE "floors" DROP CONSTRAINT "FK_58ed6d6bd6268cdf83b7c72d1b5"`);
        await queryRunner.query(`ALTER TABLE "buildings" DROP CONSTRAINT "FK_b46f7edfe320f50875f521d6f22"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP CONSTRAINT "FK_449a1b5dc2cb097bb2783f60cde"`);
        // await queryRunner.query(`DELETE FROM "tree_nodes_closure"`); // irreversable
        // await queryRunner.query(`DELETE FROM "tree_nodes"`); // irreversable
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" ALTER COLUMN "level" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tree_nodes" ALTER COLUMN "level" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_5ad2cd4b77a26b3aa85827837a"`);
        await queryRunner.query(`DROP TABLE "space_nodes_closure"`);
        await queryRunner.query(`DROP TABLE "space_nodes"`);
        await queryRunner.query(`DROP TABLE "floors"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`ALTER TABLE "areas" RENAME COLUMN "floorId" TO "treeNodeId"`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_5ab26402699477bf5d03c6834be" FOREIGN KEY ("treeNodeId") REFERENCES "tree_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
