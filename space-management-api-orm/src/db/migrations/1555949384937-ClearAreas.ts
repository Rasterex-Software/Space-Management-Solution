import {MigrationInterface, QueryRunner} from "typeorm";

export class ClearAreas1555949384937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "areas"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query(`DELETE FROM "areas"`); // not reversable
    }

}
