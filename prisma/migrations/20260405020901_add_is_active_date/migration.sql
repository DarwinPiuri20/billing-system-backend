-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
