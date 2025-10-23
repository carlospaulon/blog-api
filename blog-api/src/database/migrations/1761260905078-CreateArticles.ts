import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateArticles1761260905078 implements MigrationInterface {
  name = 'CreateArticles1761260905078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "content" text NOT NULL, "summary" character varying(500), "author" character varying(100) NOT NULL, "published" boolean NOT NULL DEFAULT false, "publishedAt" TIMESTAMP, "tags" text, "viewCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "articles"`);
  }
}
