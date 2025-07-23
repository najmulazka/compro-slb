/*
  Warnings:

  - Added the required column `createdBy` to the `Announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Documentations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcements" DROP CONSTRAINT "Announcements_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Documentations" DROP CONSTRAINT "Documentations_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Announcements" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Documentations" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "createdBy" INTEGER NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentations" ADD CONSTRAINT "Documentations_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
