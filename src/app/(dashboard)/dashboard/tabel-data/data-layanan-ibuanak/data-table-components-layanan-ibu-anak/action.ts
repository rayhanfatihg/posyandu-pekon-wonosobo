"use server";

import db from "@/lib/db";

export async function deleteLayananAnak(id_layanan: string) {
  try {
    if (!id_layanan) {
      throw new Error("ID tidak valid");
    }

    // 2. Hapus data layananIbuAnak setelah relasi diputus
    await db.layananAnak.delete({
      where: { id: id_layanan },
    });

    return { success: true, message: "Layanan Anak berhasil dihapus." };
  } catch (error) {
    console.error("Gagal menghapus layanan anak:", error);
    return { success: false, message: "Gagal menghapus layanan anak." };
  }
}

export async function editLayananAnak(
  id_layanan: string,
  data: {
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
    const existingLayanan = await db.layananAnak.findUnique({
      where: { id: id_layanan },
    });

    if (!existingLayanan) {
      return {
        success: false,
        error: "Data layanan tidak ditemukan.",
      };
    }

    // Update data layanan ibu-anak
    await db.layananAnak.update({
      where: { id: id_layanan },
      data: {
        tinggiBadanAnak: data.tinggiBadanAnak,
        beratBadanAnak: data.beratBadanAnak,
        lingkarLenganAnak: data.lingkarLenganAnak,
        lingkarKepalaAnak: data.lingkarKepalaAnak,
      },
    });

    return {
      success: true,
      message: "Data layanan anak berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Gagal mengedit layanan anak:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }
}
