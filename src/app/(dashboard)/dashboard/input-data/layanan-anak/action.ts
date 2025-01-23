"use server";

import { createClient } from "@/utils/supabase/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveDataLayananIbuAnak(data: {
  ibuId: string;
  ayahId: string;
  anakId: string;
  tinggiBadanAnak?: number;
  beratBadanAnak?: number;
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
    await db.layananAnak.create({
      data: {
        ibuId: data.ibuId,
        ayahId: data.ayahId,
        anakId: data.anakId,
        tinggiBadanAnak: data.tinggiBadanAnak,
        beratBadanAnak: data.beratBadanAnak,
        lingkarLenganAnak: data.lingkarLenganAnak,
        lingkarKepalaAnak: data.lingkarKepalaAnak,
      },
    });

    revalidatePath("(dashboard)/dashboard/input-data");
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
