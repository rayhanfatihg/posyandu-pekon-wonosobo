"use server";

import db from "@/lib/db";

export async function getDataWarga() {
  try {
    // Mengambil data dari tabel LayananLansia dan tabel terkait Warga
    const warga = await db.warga.findMany({
      select: {
        id: true,
        nik: true,
        nama: true,
        tanggalLahir: true,
      },
    });

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
      const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

      return `${year}-${month}-${day}`;
    };

    // Format data untuk menyesuaikan dengan struktur yang diinginkan
    const formattedData = warga.map((item) => ({
      id_layanan: item.id,
      namaWarga: item.nama,
      nik: item.nik,
      tanggalLahir: item.tanggalLahir, // Anda bisa format ini jika diperlukan
      //date: formatDate(item.createdAt), // Format tanggal dibuat
    }));

    return formattedData;
  } catch (error) {
    console.error("Gagal mengambil data layanan lansia:", error);
    throw new Error("Gagal mengambil data layanan lansia");
  }
}
