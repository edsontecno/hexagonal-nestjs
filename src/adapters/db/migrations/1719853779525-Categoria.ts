import { MigrationInterface, QueryRunner } from 'typeorm';

export class Categoria1719853779525 implements MigrationInterface {
  name = 'Categoria1719853779525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(500) NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categorias"`);
  }
}
