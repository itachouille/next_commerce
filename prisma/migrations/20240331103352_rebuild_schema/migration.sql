/*
  Warnings:

  - You are about to drop the column `createAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `DownloadVerification` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaidInCents" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "pricePaidInCents", "productId", "userId") SELECT "id", "pricePaidInCents", "productId", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents") SELECT "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_DownloadVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    CONSTRAINT "DownloadVerification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DownloadVerification" ("expiresAt", "id", "productId") SELECT "expiresAt", "id", "productId" FROM "DownloadVerification";
DROP TABLE "DownloadVerification";
ALTER TABLE "new_DownloadVerification" RENAME TO "DownloadVerification";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "id") SELECT "email", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
