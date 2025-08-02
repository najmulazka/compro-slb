/*
  Warnings:

  - Added the required column `semester` to the `Documentations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documentations" ADD COLUMN     "semester" INTEGER NOT NULL;
