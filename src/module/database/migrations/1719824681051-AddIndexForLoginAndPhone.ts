import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForLoginAndPhone1719824681051
  implements MigrationInterface
{
  name = 'AddIndexForLoginAndPhone1719824681051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_207dec28c1b5028d8658d9a6f1" ON "user" ("login", "phone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207dec28c1b5028d8658d9a6f1"`,
    );
  }
}
