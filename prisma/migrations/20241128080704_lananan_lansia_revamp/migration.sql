-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateTable
CREATE TABLE "Warga" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "umur" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dusun" TEXT,

    CONSTRAINT "Warga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayananLansia" (
    "id" TEXT NOT NULL,
    "wargaId" TEXT NOT NULL,
    "beratBadan" DOUBLE PRECISION,
    "tinggiBadan" DOUBLE PRECISION,
    "asamUrat" DOUBLE PRECISION,
    "gulaDarah" DOUBLE PRECISION,
    "keterangan" TEXT,
    "kolesterol" DOUBLE PRECISION,
    "lingkarPerut" DOUBLE PRECISION,
    "tensiDarah" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LayananLansia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayananIbuAnak" (
    "id" TEXT NOT NULL,
    "tinggiBadanAnak" DOUBLE PRECISION,
    "beratBadanAnak" DOUBLE PRECISION,
    "umurAnak" DOUBLE PRECISION,
    "lingkarLenganAnak" DOUBLE PRECISION,
    "lingkarKepalaAnak" DOUBLE PRECISION,
    "tinggiBadanIbu" DOUBLE PRECISION,
    "beratBadanIbu" DOUBLE PRECISION,
    "lingkarLenganIbu" DOUBLE PRECISION,
    "lingkarPinggangIbu" DOUBLE PRECISION,
    "alatKontrasepsi" TEXT,
    "anakId" TEXT NOT NULL,
    "ayahId" TEXT NOT NULL,
    "ibuId" TEXT NOT NULL,
    "jenisKelaminAnak" "JenisKelamin" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LayananIbuAnak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_content" (
    "blog_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_content_pkey" PRIMARY KEY ("blog_id")
);

-- CreateTable
CREATE TABLE "JadwalPosyandu" (
    "id" TEXT NOT NULL,
    "namaAcara" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jam" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JadwalPosyandu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Warga_nik_key" ON "Warga"("nik");

-- AddForeignKey
ALTER TABLE "LayananLansia" ADD CONSTRAINT "LayananLansia_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananIbuAnak" ADD CONSTRAINT "LayananIbuAnak_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananIbuAnak" ADD CONSTRAINT "LayananIbuAnak_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "Warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayananIbuAnak" ADD CONSTRAINT "LayananIbuAnak_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "Warga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_content" ADD CONSTRAINT "blog_content_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
