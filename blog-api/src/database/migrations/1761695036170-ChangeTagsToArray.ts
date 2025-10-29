import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTagsToArray1761695036170 implements MigrationInterface {
  name = 'ChangeTagsToArray1761695036170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //simple-array to postgre array

    await queryRunner.query(`
            ALTER TABLE "articles" 
            ADD COLUMN "tags_temp" text[] DEFAULT '{}'
        `);

    await queryRunner.query(`
            UPDATE "articles" 
            SET "tags_temp" = string_to_array("tags", ',')
            WHERE "tags" IS NOT NULL 
              AND "tags" != ''
        `);

    await queryRunner.query(`
            ALTER TABLE "articles" 
            DROP COLUMN "tags"
        `);

    await queryRunner.query(`
            ALTER TABLE "articles" 
            RENAME COLUMN "tags_temp" TO "tags"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //array to simple-array

    await queryRunner.query(`
            ALTER TABLE "articles" 
            ADD COLUMN "tags_temp" text
        `);

    await queryRunner.query(`
            UPDATE "articles" 
            SET "tags_temp" = array_to_string("tags", ',')
            WHERE "tags" IS NOT NULL
        `);

    await queryRunner.query(`
            ALTER TABLE "articles" 
            DROP COLUMN "tags"
        `);

    await queryRunner.query(`
            ALTER TABLE "articles" 
            RENAME COLUMN "tags_temp" TO "tags"
        `);
  }
}
