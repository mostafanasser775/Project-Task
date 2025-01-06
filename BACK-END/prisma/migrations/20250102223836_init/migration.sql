/*
  Warnings:

  - You are about to alter the column `customerId` on the `otpverifcations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `otpverifcations` MODIFY `customerId` INTEGER NOT NULL;
