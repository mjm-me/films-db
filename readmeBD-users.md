SELECT \* FROM movies.users;
-- CreateTable
CREATE TABLE `users` (
`user_id` VARCHAR(191) NOT NULL,
`email` VARCHAR(191) NOT NULL,
`handle_name` VARCHAR(191) NULL,
`password` VARCHAR(191) NOT NULL,
`firstName` VARCHAR(191) NOT NULL,
`lastName` VARCHAR(191) NOT NULL,
`createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`user_id`)

) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
