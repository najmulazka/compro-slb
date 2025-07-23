/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Documentation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Documentation" DROP CONSTRAINT "Documentation_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_updatedBy_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "Documentation";

-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "fileId" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documentations" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "Documentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Announcements_fileId_key" ON "Announcements"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Documentations_fileId_key" ON "Documentations"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Reports_fileId_key" ON "Reports"("fileId");

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentations" ADD CONSTRAINT "Documentations_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
