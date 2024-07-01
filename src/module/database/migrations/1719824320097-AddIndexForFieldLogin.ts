import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForFieldLogin1719824320097 implements MigrationInterface {
  name = 'AddIndexForFieldLogin1719824320097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"`,
    );
  }
}
