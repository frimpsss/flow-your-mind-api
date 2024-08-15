-- Step 1: Add the column allowing NULL values
ALTER TABLE "Question" ADD COLUMN "userId" TEXT;

-- Step 2: Manually set the userId values
-- Example: UPDATE "Question" SET "userId" = 'someUserId' WHERE "id" = 'someQuestionId';

-- Step 3: Alter the column to NOT NULL
ALTER TABLE "Question" ALTER COLUMN "userId" SET NOT NULL;

-- Step 4: Add the foreign key constraint
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
