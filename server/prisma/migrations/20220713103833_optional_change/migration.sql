/*
  Warnings:

  - A unique constraint covering the columns `[contributorId]` on the table `ContributorsOfExhibits` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ContributorsOfExhibits_contributorId_key` ON `ContributorsOfExhibits`(`contributorId`);
