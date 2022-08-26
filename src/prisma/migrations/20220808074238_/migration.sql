-- CreateEnum
CREATE TYPE "TransportType" AS ENUM ('BIKE', 'BACKPACK', 'TRAIN', 'CAR', 'ERASMUS', 'NOMAD', 'OTHER');

-- CreateEnum
CREATE TYPE "SEX" AS ENUM ('MAN', 'WOMAN', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "sex" "SEX",
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "age" INTEGER,
    "photo" TEXT,
    "description" TEXT,
    "nationality" TEXT,
    "kindOfTrip" "TransportType" NOT NULL DEFAULT E'BIKE',
    "isVisibled" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");
