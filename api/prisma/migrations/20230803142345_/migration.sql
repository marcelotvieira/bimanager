/*
  Warnings:

  - You are about to drop the `_DatabaseToQuery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_DatabaseToQuery` DROP FOREIGN KEY `_DatabaseToQuery_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DatabaseToQuery` DROP FOREIGN KEY `_DatabaseToQuery_B_fkey`;

-- DropTable
DROP TABLE `_DatabaseToQuery`;

-- CreateTable
CREATE TABLE `_QueryToDatabase` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_QueryToDatabase_AB_unique`(`A`, `B`),
    INDEX `_QueryToDatabase_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_QueryToDatabase` ADD CONSTRAINT `_QueryToDatabase_A_fkey` FOREIGN KEY (`A`) REFERENCES `Database`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QueryToDatabase` ADD CONSTRAINT `_QueryToDatabase_B_fkey` FOREIGN KEY (`B`) REFERENCES `Query`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
