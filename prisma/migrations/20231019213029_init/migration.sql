/*
  Warnings:

  - Added the required column `correo` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "correo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pedidos" ADD COLUMN     "correo" TEXT NOT NULL;
