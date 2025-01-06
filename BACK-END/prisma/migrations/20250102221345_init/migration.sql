/*
  Warnings:

  - You are about to drop the column `phone` on the `otpverifcations` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `OtpVerifcations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otpverifcations` DROP COLUMN `phone`,
    ADD COLUMN `customerId` VARCHAR(191) NOT NULL;
