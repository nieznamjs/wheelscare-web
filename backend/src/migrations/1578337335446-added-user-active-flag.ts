import {MigrationInterface, QueryRunner} from "typeorm";

export class addedUserActiveFlag1578337335446 implements MigrationInterface {
    name = 'addedUserActiveFlag1578337335446'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`, undefined);
    }

}
