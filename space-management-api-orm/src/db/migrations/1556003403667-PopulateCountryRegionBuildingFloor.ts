import {MigrationInterface, QueryRunner} from "typeorm";

export class PopulateCountryRegionBuildingFloor1556003403667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "floors"`);
        await queryRunner.query(`DELETE FROM "buildings"`);
        await queryRunner.query(`DELETE FROM "regions"`);
        await queryRunner.query(`DELETE FROM "countries"`);

        await queryRunner.query(`INSERT INTO "countries" ("id", "createdAt", "updatedAt", "label", "description") VALUES
                                (1,	'2019-04-23 07:02:05.944355',	'2019-04-23 07:02:05.944355',	'Norway',	'');`);

        await queryRunner.query(`INSERT INTO "regions" ("id", "createdAt", "updatedAt", "label", "description", "countryId") VALUES
                                (1,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Saltdal',	'',	1),
                                (2,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Bergen',	'',	1);`);

        await queryRunner.query(`INSERT INTO "buildings" ("id", "createdAt", "updatedAt", "label", "description", "regionId") VALUES
                    (1,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Saltdal Rådhus',	'',	1),
                    (2,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'OSL-02',	'',	1),
                    (3,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'BGO-01',	'',	2),
                    (4,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'BGO-02',	'',	2);`);

        await queryRunner.query(`INSERT INTO "floors" ("id", "createdAt", "updatedAt", "label", "description", "buildingId", "floorFile") VALUES
                (1,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Floor01',	'',	1,	'1500_001.dwg'),
                (2,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Floor02',	'',	1,	'1500_002.dwg'),
                (3,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Floor01',	'',	2,	'110_01.dwg'),
                (4,	'2019-04-23 07:08:19.33087',	'2019-04-23 07:08:19.33087',	'Floor02',	'',	2,	'110_02.dwg');`);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "floors"`);
        await queryRunner.query(`DELETE FROM "buildings"`);
        await queryRunner.query(`DELETE FROM "regions"`);
        await queryRunner.query(`DELETE FROM "countries"`);
    }

}
