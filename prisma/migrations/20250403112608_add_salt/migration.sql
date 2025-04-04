-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salt" TEXT NOT NULL DEFAULT '';
