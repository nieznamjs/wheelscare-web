import {MigrationInterface, QueryRunner} from "typeorm";

export class addedVehicle1585351230541 implements MigrationInterface {
    name = 'addedVehicle1585351230541'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vin" character varying NOT NULL, "paintColor" character varying NOT NULL, "paintType" character varying NOT NULL, "type" character varying NOT NULL, "transmissionType" character varying NOT NULL, "yearOfProduction" integer NOT NULL, "hasLeftSteeringWheelPosition" boolean NOT NULL DEFAULT true, "driveType" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "enginePower" integer NOT NULL, "engineCapacity" integer NOT NULL, "fuelType" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "REL_c0a0d32b2ae04801d6e5b9e5c8" UNIQUE ("ownerId"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f9740e1e654a5daddb82c60bd75"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "facebookId"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f382af58ab36057334fb262efd5"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleId"`, undefined);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_c0a0d32b2ae04801d6e5b9e5c80"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "googleId" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f382af58ab36057334fb262efd5" UNIQUE ("googleId")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "facebookId" bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f9740e1e654a5daddb82c60bd75" UNIQUE ("facebookId")`, undefined);
        await queryRunner.query(`DROP TABLE "vehicles"`, undefined);
    }

}
