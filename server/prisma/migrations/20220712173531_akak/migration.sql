-- DropForeignKey
ALTER TABLE `exhibition` DROP FOREIGN KEY `Exhibition_itemId_fkey`;

-- AlterTable
ALTER TABLE `exhibition` MODIFY `itemId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Exhibition` ADD CONSTRAINT `Exhibition_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Exhibit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
