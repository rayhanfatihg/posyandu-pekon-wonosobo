"use server";

import db from "@/lib/db";

export async function deleteLayananIbuHamil(id_layanan: string) {
  try {
    // Menghapus data berdasarkan id_layanan
    await db.layananIbuHamil.delete({
      where: {
        id: id_layanan,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Gagal menghapus layanan posbindu");
  }
}

export async function editLayananIbuHamil(
  id_layanan: string,
  data: {
    beratBadan?: number;
    tinggiBadan?: number;
    lingkarLengan?: number;
    tinggiPundus?: number;
    umurKehamilan: number;
  }
) {
  try {
    // Validasi ID layanan
    if (!id_layanan) {
      throw new Error("ID layanan tidak valid.");
    }

    // Cek apakah layanan dengan ID tersebut ada di database
    const existingLayanan = await db.layananIbuHamil.findUnique({
      where: { id: id_layanan },
    });

    if (!existingLayanan) {
      return {
        success: false,
        error: "Data layanan ibu hamil tidak ditemukan.",
      };
    }

    // Update data layanan lansia
    await db.layananIbuHamil.update({
      where: { id: id_layanan },
      data: {
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        lingkarLengan: data.lingkarLengan,
        tinggiPundus: data.tinggiPundus,
        umurKehamilan: data.umurKehamilan,
      },
    });

    return {
      success: true,
      message: "Data layanan posbindu berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Gagal mengedit layanan posbindu:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }
}
