import { MigrationInterface, QueryRunner } from "typeorm";

export class Produto1719860850830 implements MigrationInterface {
    name = 'Produto1719860850830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "descricao" character varying(500) NOT NULL, "preco" numeric(2,2) NOT NULL, "imagem" text NOT NULL, "categoriaId" integer, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_8a509e69a8c1575d0247844daec" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_8a509e69a8c1575d0247844daec"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
    }

}
