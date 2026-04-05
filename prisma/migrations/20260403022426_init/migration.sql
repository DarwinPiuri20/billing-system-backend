-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('SELLER', 'ADMIN') NOT NULL DEFAULT 'SELLER',
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `id_card` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_id_card_key`(`id_card`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
