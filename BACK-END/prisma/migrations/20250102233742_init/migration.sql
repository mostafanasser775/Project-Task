/*
  Warnings:

  - Added the required column `address` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
