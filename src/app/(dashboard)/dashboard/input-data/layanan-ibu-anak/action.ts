"use server";

import db from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { JenisKelamin } from "@prisma/client";

export async function saveDataLayananIbuAnak(data: {
  ibuId: string;
  ayahId: string;
  anakId: string;
  tinggiBadanIbu?: number;
  beratBadanIbu?: number;
  lingkarLenganIbu?: number;
  lingkarPinggangIbu?: number;
  alatKontrasepsi?: string;
  jenisKelaminAnak: JenisKelamin;
  tinggiBadanAnak?: number;
  beratBadanAnak?: number;
  umurAnak?: number;
  lingkarLenganAnak?: number;
  lingkarKepalaAnak?: number;
}) {
  try {
    // Validasi apakah user sudah login
    const user = await (await createClient()).auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Anda belum login",
      };
    }

    // Validasi apakah warga Ibu, Ayah, dan Anak ada di database
    const ibu = await db.warga.findUnique({
      where: { id: data.ibuId },
    });

    const ayah = await db.warga.findUnique({
      where: { id: data.ayahId },
    });

    const anak = await db.warga.findUnique({
      where: { id: data.anakId },
    });

    if (!ibu || !ayah || !anak) {
      return {
        success: false,
        error: "Data Ibu, Ayah, atau Anak tidak ditemukan",
      };
    }

    // Menghitung umur anak berdasarkan tanggal lahir dan tanggal layanan
    const today = new Date();
    const tanggalLahirAnak = new Date(anak.tanggalLahir);
    let umurAnak = today.getFullYear() - tanggalLahirAnak.getFullYear();
    const monthDifference = today.getMonth() - tanggalLahirAnak.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < tanggalLahirAnak.getDate())
    ) {
      umurAnak--; // Jika belum ulang tahun tahun ini, kurangi satu tahun
    }

    // Menyimpan data layanan ibu-anak dengan umur anak yang dihitung
    await db.layananIbuAnak.create({
      data: {
        ibuId: data.ibuId,
        ayahId: data.ayahId,
        anakId: data.anakId,
        tinggiBadanIbu: data.tinggiBadanIbu,
        beratBadanIbu: data.beratBadanIbu,
        lingkarLenganIbu: data.lingkarLenganIbu,
        lingkarPinggangIbu: data.lingkarPinggangIbu,
        alatKontrasepsi: data.alatKontrasepsi,
        jenisKelaminAnak: data.jenisKelaminAnak,
        tinggiBadanAnak: data.tinggiBadanAnak,
        beratBadanAnak: data.beratBadanAnak,
        umurAnak: umurAnak, // Umur yang dihitung berdasarkan tanggal lahir
        lingkarLenganAnak: data.lingkarLenganAnak,
        lingkarKepalaAnak: data.lingkarKepalaAnak,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: "Gagal menyimpan data karena error tak terduga",
    };
  }
}
