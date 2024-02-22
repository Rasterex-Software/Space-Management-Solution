import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustFilesAndColor1557832257869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            UPDATE "tenants" SET "color"='rgba(225,190,231,0.5)' WHERE "id"=7;
        `);

        await queryRunner.query(`
            INSERT INTO "files" ("id","isPrepared", "name", "hierarchyPath") VALUES
            (1, true, '1500_001.dwg','Norway / Saltdal / Saltdal Rådhus / Floor 1'),
            (2, true, '1500_002.dwg','Norway / Saltdal / Saltdal Rådhus / Floor 2'),
            (3, true, '110_01.dwg','Norway / Oslo / OSL-01 / Floor 1'),
            (4, true, '110_02.dwg','Norway / Oslo / OSL-01 / Floor 2');
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //
        await queryRunner.query(`
            DELETE FROM "files" WHERE "id"<=4 AND "id" >=1;
        `);
    }

}
