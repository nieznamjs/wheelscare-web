import {MigrationInterface, QueryRunner} from "typeorm";

export class addPasswordToUser1577558730544 implements MigrationInterface {
    name = 'addPasswordToUser1577558730544'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
    }

}
