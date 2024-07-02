import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBalanceAndIsDeleted1719834755555 implements MigrationInterface {
  name = 'AddBalanceAndIsDeleted1719834755555';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" character varying NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."balance" IS 'Balance'`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isDeleted" character varying DEFAULT false`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."isDeleted" IS 'Account was deleted'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."isDeleted" IS 'Account was deleted'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."balance" IS 'Balance'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
  }
}
