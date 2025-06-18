/*
  Warnings:

  - You are about to drop the column `postId` on the `Hashtag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_postId_fkey";

-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "PostHashtag" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PostHashtag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostHashtag_postId_tagId_key" ON "PostHashtag"("postId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_name_key" ON "Hashtag"("name");

-- AddForeignKey
ALTER TABLE "PostHashtag" ADD CONSTRAINT "PostHashtag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostHashtag" ADD CONSTRAINT "PostHashtag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
