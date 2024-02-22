import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustTenants1557473541607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(`INSERT INTO "tenants" ("id", "createdAt", "updatedAt", "label", "firstName", "lastName", "description", "phone", "email") VALUES
            (7,	'2019-03-16 02:58:30.142827',	'2019-03-16 02:58:30.142827',	'Rath Maurine',	'Maurine',	'Rath',	'Eos reprehenderit in nisi et qui quia odio et inventore.',	'242-657-7447',	'Hallie.Paucek@hotmail.com')
        `);
        await queryRunner.query(`UPDATE "areas"
            SET
                "tenantId"=7
            WHERE
                "tenantId"=1
            `);
        await queryRunner.query(`UPDATE "tenants"
            SET
                "label"='Common Space',
                "firstName"='Common',
                "lastName"='Space',
                "description"='Common Space',
                "phone"='',
                "email"='',
                "color"='rgba(100,100,100,0.3)'
            WHERE
                "id"=1
            `);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM tenants WHERE "id"=7;`);
        await queryRunner.query(`UPDATE "areas"
            SET
                "tenantId"=1
            WHERE
                "tenantId"=7
            `);
        await queryRunner.query(`UPDATE "tenants"
            SET
                "label"='Rath Maurine',
                "firstName"='Maurine',
                "lastName"='Rath',
                "description"='Eos reprehenderit in nisi et qui quia odio et inventore.',
                "phone"='242-657-7447',
                "email"='Hallie.Paucek@hotmail.com',
                "color"='rgba(225,190,231,0.5)'
            WHERE
                "id"=1
            `);
    }

}
