-- CreateTable
CREATE TABLE `Admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admins_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `fileId` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,

    UNIQUE INDEX `Announcements_fileId_key`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documentations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `fileId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `semester` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,

    UNIQUE INDEX `Documentations_fileId_key`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `fileId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `fundingSource` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NULL,

    UNIQUE INDEX `Reports_fileId_key`(`fileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcements` ADD CONSTRAINT `Announcements_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcements` ADD CONSTRAINT `Announcements_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documentations` ADD CONSTRAINT `Documentations_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documentations` ADD CONSTRAINT `Documentations_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reports` ADD CONSTRAINT `Reports_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reports` ADD CONSTRAINT `Reports_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `Admins`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
