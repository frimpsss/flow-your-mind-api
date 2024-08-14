/*
  Warnings:

  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "questionId" TEXT NOT NULL DEFAULT '00001';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL;
