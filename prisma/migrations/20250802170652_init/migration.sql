/*
  Warnings:

  - Added the required column `semester` to the `Announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcements" ADD COLUMN     "semester" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "semester" TEXT NOT NULL;
