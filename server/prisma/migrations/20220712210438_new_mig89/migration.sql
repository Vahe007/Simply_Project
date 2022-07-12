-- DropForeignKey
ALTER TABLE `contributorsofexhibits` DROP FOREIGN KEY `ContributorsOfExhibits_contributorId_fkey`;

-- AlterTable
ALTER TABLE `contributorsofexhibits` MODIFY `contributorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ContributorsOfExhibits` ADD CONSTRAINT `ContributorsOfExhibits_contributorId_fkey` FOREIGN KEY (`contributorId`) REFERENCES `Contributor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
