-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `surname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `isLoggedIn` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NOT NULL,
    `role` ENUM('EMPLOYEE', 'ADMIN', 'GUEST') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exhibit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fundNumber` VARCHAR(255) NOT NULL,
    `exhibitName` VARCHAR(255) NOT NULL,
    `materialId` INTEGER NOT NULL,
    `placeOfOrigin` VARCHAR(255) NOT NULL,
    `creationPeriod` VARCHAR(255) NOT NULL,
    `acquisitionPeriod` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `length` INTEGER NULL,
    `diameter` INTEGER NULL,
    `weight` INTEGER NULL,
    `statusId` INTEGER NOT NULL,
    `updaterId` INTEGER NOT NULL,
    `creatorId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `itemId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Status_statusName_key`(`statusName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materialName` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Material_materialName_key`(`materialName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recovery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `history` TEXT NOT NULL,
    `exhibitId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contributor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contributorName` VARCHAR(191) NOT NULL,
    `contributorSurname` VARCHAR(191) NOT NULL,
    `contributorPhoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributorsOfExhibits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contributorId` INTEGER NOT NULL,
    `exhibitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exhibition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `place` VARCHAR(255) NOT NULL,
    `headline` VARCHAR(255) NOT NULL,
    `marks` VARCHAR(255) NULL,
    `itemId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_updaterId_fkey` FOREIGN KEY (`updaterId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Exhibit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recovery` ADD CONSTRAINT `Recovery_exhibitId_fkey` FOREIGN KEY (`exhibitId`) REFERENCES `Exhibit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributorsOfExhibits` ADD CONSTRAINT `ContributorsOfExhibits_exhibitId_fkey` FOREIGN KEY (`exhibitId`) REFERENCES `Exhibit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributorsOfExhibits` ADD CONSTRAINT `ContributorsOfExhibits_contributorId_fkey` FOREIGN KEY (`contributorId`) REFERENCES `Contributor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exhibition` ADD CONSTRAINT `Exhibition_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Exhibit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
