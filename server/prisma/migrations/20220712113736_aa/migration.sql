-- DropForeignKey
ALTER TABLE `exhibit` DROP FOREIGN KEY `Exhibit_statusId_fkey`;

-- AlterTable
ALTER TABLE `exhibit` MODIFY `statusId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Exhibit` ADD CONSTRAINT `Exhibit_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
