-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_reciepientId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_reciepientId_fkey" FOREIGN KEY ("reciepientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
