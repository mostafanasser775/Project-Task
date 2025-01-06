-- AlterTable
ALTER TABLE `product` MODIFY `description` TEXT NOT NULL,
    MODIFY `image` VARCHAR(2048) NOT NULL;

-- AlterTable
ALTER TABLE `supplier` MODIFY `image` VARCHAR(2048) NULL;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `productId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
