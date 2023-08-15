-- CreateTable
CREATE TABLE `Query` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `query` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DatabaseToQuery` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DatabaseToQuery_AB_unique`(`A`, `B`),
    INDEX `_DatabaseToQuery_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DatabaseToQuery` ADD CONSTRAINT `_DatabaseToQuery_A_fkey` FOREIGN KEY (`A`) REFERENCES `Database`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DatabaseToQuery` ADD CONSTRAINT `_DatabaseToQuery_B_fkey` FOREIGN KEY (`B`) REFERENCES `Query`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
