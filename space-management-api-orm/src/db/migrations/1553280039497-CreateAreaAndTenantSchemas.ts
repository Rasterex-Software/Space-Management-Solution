import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAreaAndTenantSchemas1553280039497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE IF EXISTS "tenants";
        DROP SEQUENCE IF EXISTS tenants_id_seq;
        CREATE SEQUENCE tenants_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

        CREATE TABLE "public"."tenants" (
            "id" integer DEFAULT nextval('tenants_id_seq') NOT NULL,
            "createdAt" timestamp DEFAULT now(),
            "updatedAt" timestamp DEFAULT now(),
            "label" character varying(100) NOT NULL,
            "firstName" character varying(100) NOT NULL,
            "lastName" character varying(100) NOT NULL,
            "description" text,
            "phone" character varying(20) NOT NULL,
            "email" character varying(255) NOT NULL,
            CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id")
        ) WITH (oids = false);

        DROP TABLE IF EXISTS "areas";
        DROP SEQUENCE IF EXISTS areas_id_seq;
        CREATE SEQUENCE areas_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

        CREATE TABLE "public"."areas" (
            "id" integer DEFAULT nextval('areas_id_seq') NOT NULL,
            "createdAt" timestamp DEFAULT now(),
            "updatedAt" timestamp DEFAULT now(),
            "label" character varying(100) NOT NULL,
            "description" text,
            "surface" integer NOT NULL,
            "type" areas_type_enum DEFAULT 'common' NOT NULL,
            "vectorBlockIndex" integer NOT NULL,
            "floorFile" character varying NOT NULL,
            "tenantId" integer,
            CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"),
            CONSTRAINT "FK_a40cb13177a9b0841a5af2a6fc8" FOREIGN KEY ("tenantId") REFERENCES tenants(id) NOT DEFERRABLE
        ) WITH (oids = false);`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE areas;`);
        await queryRunner.query(`DROP TABLE tenants;`);
    }

}
