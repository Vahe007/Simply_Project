/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `categoryName` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_categoryName_key` ON `Category`(`categoryName`);
