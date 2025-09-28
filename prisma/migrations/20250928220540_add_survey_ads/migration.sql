-- AlterTable
ALTER TABLE "public"."ads" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'regular',
ALTER COLUMN "linkUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."surveys" (
    "id" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."survey_responses" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "selectedOption" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "surveys_adId_key" ON "public"."surveys"("adId");

-- CreateIndex
CREATE UNIQUE INDEX "survey_responses_surveyId_ipAddress_key" ON "public"."survey_responses"("surveyId", "ipAddress");

-- AddForeignKey
ALTER TABLE "public"."surveys" ADD CONSTRAINT "surveys_adId_fkey" FOREIGN KEY ("adId") REFERENCES "public"."ads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."survey_responses" ADD CONSTRAINT "survey_responses_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "public"."surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
