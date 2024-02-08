/*
  Warnings:

  - You are about to drop the column `userId` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "userId";
