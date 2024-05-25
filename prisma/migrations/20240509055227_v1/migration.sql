-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `FName` VARCHAR(15) NOT NULL,
    `image` VARCHAR(150) NULL,
    `LName` VARCHAR(15) NULL,
    `password` VARCHAR(254) NULL,
    `salt` VARCHAR(254) NULL,
    `authProviderType` ENUM('OAUTH', 'EMAIL', 'CREDENTIALS') NOT NULL,
    `role` ENUM('STUDENT', 'LIBRARIAN', 'ADMIN') NOT NULL DEFAULT 'STUDENT',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(64) NOT NULL,
    `isbn` VARCHAR(64) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `available` INTEGER NOT NULL DEFAULT 1,
    `publicationYear` YEAR NOT NULL,
    `description` TEXT NOT NULL,

    UNIQUE INDEX `Book_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookGenre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    UNIQUE INDEX `BookGenre_bookId_genreId_key`(`bookId`, `genreId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Borrowing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `borrowedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnedDate` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Borrowing_userId_bookId_key`(`userId`, `bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrowing` ADD CONSTRAINT `Borrowing_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrowing` ADD CONSTRAINT `Borrowing_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
