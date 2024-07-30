/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Watch" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "bestSeler" DECIMAL(65,30) NOT NULL,
    "material" TEXT NOT NULL,
    "water_resistance" BOOLEAN NOT NULL,
    "features" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "ownerID" INTEGER NOT NULL,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchOrder" (
    "id" SERIAL NOT NULL,
    "userOrderID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "shipping_address" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "shipping_cost" DECIMAL(65,30) NOT NULL,
    "tracking_number" TEXT NOT NULL,
    "commandeDeliveryId" INTEGER,

    CONSTRAINT "WatchOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandDelivery" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "tracking_number" INTEGER NOT NULL,
    "shipping_address" TEXT NOT NULL,

    CONSTRAINT "CommandDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchReview" (
    "id" SERIAL NOT NULL,
    "watchID" INTEGER NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "comment" TEXT NOT NULL,
    "review_date" TIMESTAMP(3) NOT NULL,
    "authorID" INTEGER NOT NULL,

    CONSTRAINT "WatchReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_watchOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchOrder_commandeDeliveryId_key" ON "WatchOrder"("commandeDeliveryId");

-- CreateIndex
CREATE UNIQUE INDEX "_watchOrder_AB_unique" ON "_watchOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_watchOrder_B_index" ON "_watchOrder"("B");

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchOrder" ADD CONSTRAINT "WatchOrder_userOrderID_fkey" FOREIGN KEY ("userOrderID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchOrder" ADD CONSTRAINT "WatchOrder_commandeDeliveryId_fkey" FOREIGN KEY ("commandeDeliveryId") REFERENCES "CommandDelivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchReview" ADD CONSTRAINT "WatchReview_watchID_fkey" FOREIGN KEY ("watchID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchReview" ADD CONSTRAINT "WatchReview_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchOrder" ADD CONSTRAINT "_watchOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Watch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_watchOrder" ADD CONSTRAINT "_watchOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "WatchOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
