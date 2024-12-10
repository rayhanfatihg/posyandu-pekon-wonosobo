"use server";

import db from "@/lib/db";

export async function deleteLayananIbuAnak(id_layanan: string) {
  try {
    if (!id_layanan) {
      throw new Error("ID tidak valid");
    }

    // 2. Hapus data layananIbuAnak setelah relasi diputus
    await db.layananIbuAnak.delete({
      where: { id: id_layanan },
    });

    return { success: true, message: "Layanan Ibu Anak berhasil dihapus." };
  } catch (error) {
    console.error("Gagal menghapus layanan ibu anak:", error);
    return { success: false, message: "Gagal menghapus layanan ibu anak." };
  }
}

export async function editLayananIbuAnak(
  id_layanan: string,
  data: {
    tinggiBadanIbu?: number;
    beratBadanIbu?: number;
    lingkarLenganIbu?: number;
    lingkarPinggangIbu?: number;
    alatKontrasepsi?: string;
    tinggiBadanAnak?: number;
    beratBadanAnak?: number;
    lingkarLenganAnak?: number;
    lingkarKepalaAnak?: number;
  }
) {
  try {
    // Validasi ID layanan
    if (!id_layanan) {
      throw new Error("ID layanan tidak valid.");
    }

    // Cek apakah layanan dengan ID tersebut ada
    const existingLayanan = await db.layananIbuAnak.findUnique({
      where: { id: id_layanan },
    });

    if (!existingLayanan) {
      return {
        success: false,
        error: "Data layanan tidak ditemukan.",
      };
    }

    // Update data layanan ibu-anak
    await db.layananIbuAnak.update({
      where: { id: id_layanan },
      data: {
        tinggiBadanIbu: data.tinggiBadanIbu,
        beratBadanIbu: data.beratBadanIbu,
        lingkarLenganIbu: data.lingkarLenganIbu,
        lingkarPinggangIbu: data.lingkarPinggangIbu,
        alatKontrasepsi: data.alatKontrasepsi,
        tinggiBadanAnak: data.tinggiBadanAnak,
        beratBadanAnak: data.beratBadanAnak,
        lingkarLenganAnak: data.lingkarLenganAnak,
        lingkarKepalaAnak: data.lingkarKepalaAnak,
      },
    });

    return {
      success: true,
      message: "Data layanan ibu-anak berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Gagal mengedit layanan ibu-anak:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }
}
