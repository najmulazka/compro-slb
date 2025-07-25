/*
  Warnings:

  - You are about to drop the column `isSuperAdmin` on the `Admins` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "isSuperAdmin";

-- CreateIndex
CREATE UNIQUE INDEX "Admins_username_key" ON "Admins"("username");
