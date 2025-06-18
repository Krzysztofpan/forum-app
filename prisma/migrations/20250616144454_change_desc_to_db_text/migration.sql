/*
  Warnings:

  - You are about to alter the column `desc` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(280)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "desc" SET DATA TYPE VARCHAR(255);
