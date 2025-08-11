-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "adminsId" INTEGER,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "Admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
