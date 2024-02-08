-- CreateEnum
CREATE TYPE "StateSale" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" "StateSale" NOT NULL DEFAULT 'OPEN';
