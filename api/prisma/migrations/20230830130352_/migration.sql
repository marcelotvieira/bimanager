-- AlterTable
ALTER TABLE `Query` ADD COLUMN `IsCompatibleWithPeriod` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `chartXAxisKey` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `chartYAxisKey` VARCHAR(191) NOT NULL DEFAULT '';