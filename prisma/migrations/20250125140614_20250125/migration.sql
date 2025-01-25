/*
  Warnings:

  - You are about to drop the `LayananIbuAnak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LayananLansia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Warga` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LayananIbuAnak" DROP CONSTRAINT "LayananIbuAnak_anakId_fkey";

-- DropForeignKey
ALTER TABLE "LayananIbuAnak" DROP CONSTRAINT "LayananIbuAnak_ayahId_fkey";

-- DropForeignKey
ALTER TABLE "LayananIbuAnak" DROP CONSTRAINT "LayananIbuAnak_ibuId_fkey";

-- DropForeignKey
ALTER TABLE "LayananLansia" DROP CONSTRAINT "LayananLansia_wargaId_fkey";

-- DropForeignKey
ALTER TABLE "blog_content" DROP CONSTRAINT "blog_content_blog_id_fkey";

-- AlterTable
ALTER TABLE "JadwalPosyandu" ALTER COLUMN "namaAcara" DROP NOT NULL,
ALTER COLUMN "tanggal" DROP NOT NULL,
ALTER COLUMN "tanggal" SET DATA TYPE DATE,
ALTER COLUMN "jam" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "blog" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "is_premium" DROP NOT NULL,
ALTER COLUMN "is_premium" DROP DEFAULT,
ALTER COLUMN "is_published" DROP NOT NULL,
ALTER COLUMN "is_published" DROP DEFAULT;

-- AlterTable
ALTER TABLE "blog_content" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- DropTable
DROP TABLE "LayananIbuAnak";

-- DropTable
DROP TABLE "LayananLansia";

-- DropTable
DROP TABLE "Warga";

-- DropEnum
DROP TYPE "JenisKelamin";

-- CreateTable
CREATE TABLE "LayananAnak" (
    "id" TEXT NOT NULL,
    "tinggiBadanAnak" DOUBLE PRECISION,
    "beratBadanAnak" DOUBLE PRECISION,
    "lingkarLenganAnak" DOUBLE PRECISION,
    "lingkarKepalaAnak" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "anakId" TEXT,
    "ayahId" TEXT,
    "ibuId" TEXT,

    CONSTRAINT "LayananAnak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayananIbuHamil" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bumilId" TEXT,
    "tinggiBadan" DOUBLE PRECISION,
    "beratBadan" DOUBLE PRECISION,
    "lingkarLengan" DOUBLE PRECISION,
    "tinggiPundus" DOUBLE PRECISION,
    "umurKehamilan" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "LayananIbuHamil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warga" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "umur" BIGINT,

    CONSTRAINT "warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayananPosbindu" (
    "id" TEXT NOT NULL,
    "wargaId" TEXT NOT NULL,
    "beratBadan" DOUBLE PRECISION,
    "tinggiBadan" DOUBLE PRECISION,
    "lingkarPerut" DOUBLE PRECISION,
    "lingkarLengan" DOUBLE PRECISION,
    "tensiDarah" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "updatedAt" TIMESTAMP(6),
    "keterangan" TEXT,

    CONSTRAINT "LayananLansia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warga_nik_key" ON "warga"("nik");

-- AddForeignKey
ALTER TABLE "blog_content" ADD CONSTRAINT "blog_content_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "warga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "warga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LayananAnak" ADD CONSTRAINT "LayananAnak_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "warga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LayananIbuHamil" ADD CONSTRAINT "LayananIbuHamil_bumilId_fkey" FOREIGN KEY ("bumilId") REFERENCES "warga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LayananPosbindu" ADD CONSTRAINT "LayananLansia_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "warga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
