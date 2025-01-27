"use server";

import db from "@/lib/db";

export async function deleteWarga(id_layanan: string) {
  try {
    // Menghapus data berdasarkan id_layanan
    await db.warga.delete({
      where: {
        id: id_layanan,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Gagal menghapus layanan posbindu");
  }
}

export async function editWarga(
  id_layanan: string,
  data: {
    nama?: string;
    nik?: string;
    tanggalLahir?: Date;
    
  }
) {
  try {
    // Validasi ID layanan
    if (!id_layanan) {
      throw new Error("ID layanan tidak valid.");
    }

    // Cek apakah layanan dengan ID tersebut ada di database
    const existingLayanan = await db.layananPosbindu.findUnique({
      where: { id: id_layanan },
    });

    if (!existingLayanan) {
      return {
        success: false,
        error: "Data warga tidak ditemukan.",
      };
    }

    // Update data layanan lansia
    await db.warga.update({
      where: { id: id_layanan },
      data: {
        nama: data.nama,
        nik: data.nik,
        tanggalLahir: data.tanggalLahir,
      },
    });

    return {
      success: true,
      message: "Data warga berhasil diperbarui.",
    };
  } catch (error) {
    console.error("Gagal mengedit warga:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan.",
    };
  }
}
