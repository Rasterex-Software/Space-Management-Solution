import {MigrationInterface, QueryRunner} from "typeorm";

export class TreeNodesStructure1553621093205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tree_nodes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "fileName" character varying(100) DEFAULT '', "level" integer NOT NULL, "parentId" integer, CONSTRAINT "PK_324dfa4eb6df7c0553a034c2f42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tree_nodes_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_acff0d0db90753e03a71e92fd82" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8111082c6af990e0cc32c4dcbe" ON "tree_nodes_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c6e64b686612fc3ae9d1ced12" ON "tree_nodes_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "areas" ADD "treeNodeId" integer`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "tree_nodes" ADD CONSTRAINT "FK_8aff7aa6aa930ffd5f259b27da7" FOREIGN KEY ("parentId") REFERENCES "tree_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_5ab26402699477bf5d03c6834be" FOREIGN KEY ("treeNodeId") REFERENCES "tree_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" ADD CONSTRAINT "FK_8111082c6af990e0cc32c4dcbe7" FOREIGN KEY ("id_ancestor") REFERENCES "tree_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" ADD CONSTRAINT "FK_4c6e64b686612fc3ae9d1ced127" FOREIGN KEY ("id_descendant") REFERENCES "tree_nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" DROP CONSTRAINT "FK_4c6e64b686612fc3ae9d1ced127"`);
        await queryRunner.query(`ALTER TABLE "tree_nodes_closure" DROP CONSTRAINT "FK_8111082c6af990e0cc32c4dcbe7"`);
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_5ab26402699477bf5d03c6834be"`);
        await queryRunner.query(`ALTER TABLE "tree_nodes" DROP CONSTRAINT "FK_8aff7aa6aa930ffd5f259b27da7"`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "areas" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tenants" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "areas" DROP COLUMN "treeNodeId"`);
        await queryRunner.query(`DROP INDEX "IDX_4c6e64b686612fc3ae9d1ced12"`);
        await queryRunner.query(`DROP INDEX "IDX_8111082c6af990e0cc32c4dcbe"`);
        await queryRunner.query(`DROP TABLE "tree_nodes_closure"`);
        await queryRunner.query(`DROP TABLE "tree_nodes"`);
    }

}
