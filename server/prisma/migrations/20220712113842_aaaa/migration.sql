-- DropForeignKey
ALTER TABLE `exhibit` DROP FOREIGN KEY `Exhibit_categoryId_fkey`;

-- AlterTable
ALTER TABLE `exhibit` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
