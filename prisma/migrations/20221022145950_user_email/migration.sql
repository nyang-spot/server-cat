/*
  Warnings:

  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cats_description_key";

-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "image" VARCHAR(255) NOT NULL,
ADD COLUMN     "location" VARCHAR(100) NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE REAL,
ALTER COLUMN "longitude" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "location" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
