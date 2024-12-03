"use server";

import db from "@/lib/db";

export async function getWargaStats() {
  try {
    const totalWarga = await db.warga.count();
    const rataRataUmur = await db.warga.aggregate({
      _avg: {
        umur: true,
      },
    });

    return {
      totalWarga,
      rataRataUmur: rataRataUmur._avg.umur,
    };
  } catch (error) {
    console.error("Gagal mengambil data statistik warga:", error);
    throw new Error("Gagal mengambil data statistik warga");
  }
}

export async function getLayananIbuAnakStats() {
  try {
    const layananIbuAnak = await db.layananIbuAnak.findMany({
      select: {
        id: true,
        anakId: true,
        ibuId: true,
        jenisKelaminAnak: true,
        tinggiBadanAnak: true,
        beratBadanAnak: true,
        umurAnak: true,
        lingkarLenganAnak: true,
        lingkarKepalaAnak: true,
        tinggiBadanIbu: true,
        beratBadanIbu: true,
        lingkarLenganIbu: true,
        lingkarPinggangIbu: true,
        alatKontrasepsi: true,
      },
    });

    return layananIbuAnak;
  } catch (error) {
    console.error("Gagal mengambil data layanan ibu dan anak:", error);
    throw new Error("Gagal mengambil data layanan ibu dan anak");
  }
}

export async function getLayananLansiaStats() {
  try {
    const layananLansia = await db.layananLansia.findMany({
      select: {
        id: true,
        wargaId: true,
        beratBadan: true,
        tinggiBadan: true,
        asamUrat: true,
        gulaDarah: true,
        kolesterol: true,
        tensiDarah: true,
        lingkarPerut: true,
      },
    });

    return layananLansia;
  } catch (error) {
    console.error("Gagal mengambil data layanan lansia:", error);
    throw new Error("Gagal mengambil data layanan lansia");
  }
}

export async function getJadwalPosyandu() {
  try {
    const jadwalPosyandu = await db.jadwalPosyandu.findMany({
      select: {
        id: true,
        namaAcara: true,
        tanggal: true,
        jam: true,
      },
      orderBy: {
        tanggal: "asc", // Menampilkan jadwal yang akan datang terlebih dahulu
      },
    });

    return jadwalPosyandu;
  } catch (error) {
    console.error("Gagal mengambil data jadwal posyandu:", error);
    throw new Error("Gagal mengambil data jadwal posyandu");
  }
}
