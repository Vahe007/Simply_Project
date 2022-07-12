-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_itemId_fkey`;

-- AlterTable
ALTER TABLE `image` MODIFY `itemId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Exhibit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
