-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "public_id" TEXT,
ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "view" INTEGER NOT NULL DEFAULT 0;
