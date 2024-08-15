-- Step 1: Add the column allowing NULL values
ALTER TABLE "Question" ADD COLUMN "createdOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "title" TEXT;

-- Step 2: Update existing rows with a proper title
UPDATE "Question" SET "title" = 'Default Title' WHERE "title" IS NULL;

-- Step 3: Alter the column to NOT NULL
ALTER TABLE "Question" ALTER COLUMN "title" SET NOT NULL;
