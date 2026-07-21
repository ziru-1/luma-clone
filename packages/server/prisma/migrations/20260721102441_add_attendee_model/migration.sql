-- CreateEnum
CREATE TYPE "AttendeeStatus" AS ENUM ('GOING', 'NOT_GOING', 'WAITLIST', 'PENDING', 'DECLINED');

-- CreateTable
CREATE TABLE "attendees" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "AttendeeStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_user_id_key" ON "attendees"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendees" ADD CONSTRAINT "attendees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
