/*
  Warnings:

  - You are about to drop the column `IsCompatibleWithPeriod` on the `Query` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Query` DROP COLUMN `IsCompatibleWithPeriod`,
    ADD COLUMN `isCompatibleWithPeriod` BOOLEAN NOT NULL DEFAULT true;
