/*
  Warnings:

  - You are about to alter the column `umur` on the `warga` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `updatedAt` on table `warga` required. This step will fail if there are existing NULL values in that column.
  - Made the column `umur` on table `warga` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LayananAnak" DROP CONSTRAINT "LayananAnak_anakId_fkey";

-- DropForeignKey
ALTER TABLE "LayananAnak" DROP CONSTRAINT "LayananAnak_ayahId_fkey";

-- DropForeignKey
ALTER TABLE "LayananAnak" DROP CONSTRAINT "LayananAnak_ibuId_fkey";

-- DropForeignKey
ALTER TABLE "LayananIbuHamil" DROP CONSTRAINT "LayananIbuHamil_bumilId_fkey";

-- DropForeignKey
ALTER TABLE "LayananPosbindu" DROP CONSTRAINT "LayananLansia_wargaId_fkey";

-- AlterTable
ALTER TABLE "warga" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "umur" SET NOT NULL,
ALTER COLUMN "umur" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananIbuHamil" ADD CONSTRAINT "LayananIbuHamil_bumilId_fkey" FOREIGN KEY ("bumilId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananPosbindu" ADD CONSTRAINT "LayananLansia_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
