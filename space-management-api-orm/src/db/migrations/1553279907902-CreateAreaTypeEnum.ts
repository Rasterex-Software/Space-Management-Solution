import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAreaTypeEnum1553279907902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE areas_type_enum AS ENUM('common', 'rentable');`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TYPE areas_type_enum;`);
    }

}
