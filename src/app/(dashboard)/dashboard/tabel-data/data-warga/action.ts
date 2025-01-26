"use server";

import db from "@/lib/db";

export async function getDataLayananPosbindu() {
  try {
    // Mengambil data dari tabel LayananLansia dan tabel terkait Warga
    const layananPosbinduData = await db.layananPosbindu.findMany({
      select: {
        id: true,
        wargaId: true,
        beratBadan: true,
        tinggiBadan: true,
        keterangan: true,
        lingkarPerut: true,
        tensiDarah: true,
        createdAt: true,
        updatedAt: true,
        warga: {
          select: {
            id: true,
            nama: true,
            nik: true,
            tanggalLahir: true,
          },
        },
      },
    });

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
      const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

      return `${year}-${month}-${day}`;
    };

    // Format data untuk menyesuaikan dengan struktur yang diinginkan
    const formattedData = layananPosbinduData.map((item) => ({
      id_layanan: item.id,
      namaWarga: item.warga.nama,
      nik: item.warga.nik,
      tanggalLahir: item.warga.tanggalLahir, // Anda bisa format ini jika diperlukan
      beratBadan: item.beratBadan ?? null,
      tinggiBadan: item.tinggiBadan ?? null,
      keterangan: item.keterangan ?? null,
      lingkarPerut: item.lingkarPerut ?? null,
      tensiDarah: item.tensiDarah ?? null,
      date: formatDate(item.createdAt), // Format tanggal dibuat
    }));

    return formattedData;
  } catch (error) {
    console.error("Gagal mengambil data layanan lansia:", error);
    throw new Error("Gagal mengambil data layanan lansia");
  }
}
