"use server";

import db from "@/lib/db";

export async function deleteLayananLansia(id_layanan: string) {
  try {
    // Menghapus data berdasarkan id_layanan
    await db.layananLansia.delete({
      where: {
        id: id_layanan,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Gagal menghapus layanan lansia");
  }
}

export async function editLayananLansia(
  id_layanan: string,
  data: {
    beratBadan?: number;
    tinggiBadan?: number;
    asamUrat?: number;
    gulaDarah?: number;
    kolesterol?: number;
    lingkarPerut?: number;
    tensiDarah?: string;
    keterangan?: string;
  }
) {
  try {
    // Validasi ID layanan
    if (!id_layanan) {
      throw new Error("ID layanan tidak valid.");
    }

    // Cek apakah layanan dengan ID tersebut ada di database
    const existingLayanan = await db.layananLansia.findUnique({
      where: { id: id_layanan },
    });

    if (!existingLayanan) {
      return {
        success: false,
        error: "Data layanan lansia tidak ditemukan.",
      };
    }

    // Update data layanan lansia
    await db.layananLansia.update({
      where: { id: id_layanan },
      data: {
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        asamUrat: data.asamUrat,
        gulaDarah: data.gulaDarah,
        kolesterol: data.kolesterol,
        lingkarPerut: data.lingkarPerut,
        tensiDarah: data.tensiDarah,
        keterangan: data.keterangan,
      },
    });

    return {
      success: true,
      message: "Data layanan lansia berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Gagal mengedit layanan lansia:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }
}
