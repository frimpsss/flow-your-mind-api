-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
