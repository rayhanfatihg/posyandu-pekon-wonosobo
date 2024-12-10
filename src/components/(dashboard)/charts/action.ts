"use server";

import db from "@/lib/db";

// Fungsi untuk mengambil jumlah pemeriksaan Layanan Ibu Anak per bulan (Januari - Desember)
export async function getLayananIbuAnakPerBulan() {
  try {
    const layananData = await db.layananIbuAnak.findMany({
      select: { createdAt: true },
    });

    const pemeriksaanPerBulan = Array(12).fill(0);
    layananData.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();
      pemeriksaanPerBulan[month]++;
    });

    const formattedData = pemeriksaanPerBulan.map((jumlah, index) => ({
      bulan: new Date(0, index).toLocaleString("id-ID", { month: "long" }),
      pemeriksaanIbuAnak: jumlah,
    }));

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("Gagal mengambil data Layanan Ibu Anak:", error);
    return { success: false, data: [], error: "Gagal mengambil data." };
  }
}

// Fungsi untuk mengambil jumlah pemeriksaan Layanan Lansia per bulan (Januari - Desember)
export async function getLayananLansiaPerBulan() {
  try {
    const layananData = await db.layananLansia.findMany({
      select: { createdAt: true },
    });

    const pemeriksaanPerBulan = Array(12).fill(0);
    layananData.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();
      pemeriksaanPerBulan[month]++;
    });

    const formattedData = pemeriksaanPerBulan.map((jumlah, index) => ({
      bulan: new Date(0, index).toLocaleString("id-ID", { month: "long" }),
      pemeriksaanLansia: jumlah,
    }));

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("Gagal mengambil data Layanan Lansia:", error);
    return { success: false, data: [], error: "Gagal mengambil data." };
  }
}

// Fungsi untuk menggabungkan data Layanan Ibu Anak dan Lansia
export async function getCombinedLayananPerBulan() {
  const [ibuAnakResponse, lansiaResponse] = await Promise.all([
    getLayananIbuAnakPerBulan(),
    getLayananLansiaPerBulan(),
  ]);

  if (!ibuAnakResponse.success || !lansiaResponse.success) {
    return { success: false, data: [], error: "Gagal mengambil data layanan." };
  }

  // Gabungkan data berdasarkan bulan
  const combinedData = ibuAnakResponse.data.map((item, index) => ({
    bulan: item.bulan,
    pemeriksaanIbuAnak: item.pemeriksaanIbuAnak,
    pemeriksaanLansia: lansiaResponse.data[index]?.pemeriksaanLansia || 0,
  }));

  return { success: true, data: combinedData };
}

// Fungsi untuk mengambil rata-rata pemeriksaan Layanan Lansia per bulan
export async function getRataRataLayananLansiaPerBulan() {
  try {
    const layananData = await db.layananLansia.findMany({
      select: {
        createdAt: true,
        gulaDarah: true,
        tensiDarah: true,
        beratBadan: true,
        tinggiBadan: true,
        asamUrat: true,
        kolesterol: true,
        lingkarPerut: true,
      },
    });

    // Inisialisasi array untuk menyimpan total nilai dan jumlah data per bulan
    const bulanData = Array(12)
      .fill(0)
      .map(() => ({
        totalGds: 0,
        totalTensi: 0,
        totalBerat: 0,
        totalTinggi: 0,
        totalAsamUrat: 0,
        totalKolesterol: 0,
        totalLingkarPerut: 0,
        jumlahGds: 0,
        jumlahTensi: 0,
        jumlahBerat: 0,
        jumlahTinggi: 0,
        jumlahAsamUrat: 0,
        jumlahKolesterol: 0,
        jumlahLingkarPerut: 0,
      }));

    // Iterasi setiap data dan akumulasikan nilainya
    layananData.forEach((item) => {
      const month = new Date(item.createdAt).getMonth();

      if (item.gulaDarah !== null) {
        bulanData[month].totalGds += item.gulaDarah;
        bulanData[month].jumlahGds++;
      }

      if (item.tensiDarah !== null) {
        bulanData[month].totalTensi += parseFloat(item.tensiDarah);
        bulanData[month].jumlahTensi++;
      }

      if (item.beratBadan !== null) {
        bulanData[month].totalBerat += item.beratBadan;
        bulanData[month].jumlahBerat++;
      }

      if (item.tinggiBadan !== null) {
        bulanData[month].totalTinggi += item.tinggiBadan;
        bulanData[month].jumlahTinggi++;
      }

      if (item.asamUrat !== null) {
        bulanData[month].totalAsamUrat += item.asamUrat;
        bulanData[month].jumlahAsamUrat++;
      }

      if (item.kolesterol !== null) {
        bulanData[month].totalKolesterol += item.kolesterol;
        bulanData[month].jumlahKolesterol++;
      }

      if (item.lingkarPerut !== null) {
        bulanData[month].totalLingkarPerut += item.lingkarPerut;
        bulanData[month].jumlahLingkarPerut++;
      }
    });

    // Hitung rata-rata per bulan
    const formattedData = bulanData.map((data, index) => {
      const namaBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ][index];

      return {
        bulan: namaBulan,
        rataRataGds:
          data.jumlahGds > 0
            ? parseFloat((data.totalGds / data.jumlahGds).toFixed(2))
            : 0,
        rataRataTensi:
          data.jumlahTensi > 0
            ? parseFloat((data.totalTensi / data.jumlahTensi).toFixed(2))
            : 0,
        rataRataBerat:
          data.jumlahBerat > 0
            ? parseFloat((data.totalBerat / data.jumlahBerat).toFixed(2))
            : 0,
        rataRataTinggi:
          data.jumlahTinggi > 0
            ? parseFloat((data.totalTinggi / data.jumlahTinggi).toFixed(2))
            : 0,
        rataRataAsamUrat:
          data.jumlahAsamUrat > 0
            ? parseFloat((data.totalAsamUrat / data.jumlahAsamUrat).toFixed(2))
            : 0,
        rataRataKolesterol:
          data.jumlahKolesterol > 0
            ? parseFloat(
                (data.totalKolesterol / data.jumlahKolesterol).toFixed(2)
              )
            : 0,
        rataRataLingkarPerut:
          data.jumlahLingkarPerut > 0
            ? parseFloat(
                (data.totalLingkarPerut / data.jumlahLingkarPerut).toFixed(2)
              )
            : 0,
      };
    });

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("Gagal mengambil rata-rata layanan lansia:", error);
    return { success: false, data: [], error: "Gagal mengambil data." };
  }
}

export async function getRataRataPemeriksaanAnak() {
  try {
    // Ambil semua data LayananIbuAnak
    const layananData = await db.layananIbuAnak.findMany({
      select: {
        createdAt: true,
        beratBadanAnak: true,
        tinggiBadanAnak: true,
        lingkarLenganAnak: true,
        lingkarKepalaAnak: true,
      },
    });

    // Inisialisasi array untuk menyimpan total nilai dan jumlah data per bulan
    const bulanData = Array(12)
      .fill(0)
      .map(() => ({
        totalBerat: 0,
        totalTinggi: 0,
        totalLingkarLengan: 0,
        totalLingkarKepala: 0,
        jumlahDataBerat: 0,
        jumlahDataTinggi: 0,
        jumlahDataLingkarLengan: 0,
        jumlahDataLingkarKepala: 0,
      }));

    // Iterasi data dan akumulasikan nilai-nilai berdasarkan bulan
    layananData.forEach((item) => {
      const month = new Date(item.createdAt).getMonth(); // 0 = Januari, 11 = Desember

      // Akumulasi Berat Badan Anak
      if (item.beratBadanAnak !== null) {
        bulanData[month].totalBerat += item.beratBadanAnak;
        bulanData[month].jumlahDataBerat++;
      }

      // Akumulasi Tinggi Badan Anak
      if (item.tinggiBadanAnak !== null) {
        bulanData[month].totalTinggi += item.tinggiBadanAnak;
        bulanData[month].jumlahDataTinggi++;
      }

      // Akumulasi Lingkar Lengan Anak
      if (item.lingkarLenganAnak !== null) {
        bulanData[month].totalLingkarLengan += item.lingkarLenganAnak;
        bulanData[month].jumlahDataLingkarLengan++;
      }

      // Akumulasi Lingkar Kepala Anak
      if (item.lingkarKepalaAnak !== null) {
        bulanData[month].totalLingkarKepala += item.lingkarKepalaAnak;
        bulanData[month].jumlahDataLingkarKepala++;
      }
    });

    // Hitung rata-rata per bulan
    const formattedData = bulanData.map((data, index) => {
      const namaBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ][index];

      return {
        bulan: namaBulan,
        rataRataBerat:
          data.jumlahDataBerat > 0
            ? parseFloat((data.totalBerat / data.jumlahDataBerat).toFixed(2))
            : 0,
        rataRataTinggi:
          data.jumlahDataTinggi > 0
            ? parseFloat((data.totalTinggi / data.jumlahDataTinggi).toFixed(2))
            : 0,
        rataRataLingkarLengan:
          data.jumlahDataLingkarLengan > 0
            ? parseFloat(
                (
                  data.totalLingkarLengan / data.jumlahDataLingkarLengan
                ).toFixed(2)
              )
            : 0,
        rataRataLingkarKepala:
          data.jumlahDataLingkarKepala > 0
            ? parseFloat(
                (
                  data.totalLingkarKepala / data.jumlahDataLingkarKepala
                ).toFixed(2)
              )
            : 0,
      };
    });

    return { success: true, data: formattedData };
  } catch (error) {
    console.error("Gagal mengambil data pemeriksaan anak:", error);
    return { success: false, error: "Gagal mengambil data pemeriksaan anak." };
  }
}

// Fungsi untuk menghitung status gizi anak
export async function getStatusGiziAnak() {
  try {
    // Ambil semua data layanan ibu anak
    const layananData = await db.layananIbuAnak.findMany({
      select: {
        beratBadanAnak: true,
        tinggiBadanAnak: true,
        umurAnak: true,
      },
    });

    // Inisialisasi kategori status gizi
    let giziBaik = 0;
    let kurangGizi = 0;
    let giziBuruk = 0;

    // Hitung status gizi berdasarkan berat badan dan tinggi badan
    layananData.forEach((item) => {
      if (item.beratBadanAnak && item.tinggiBadanAnak) {
        // Hitung rasio BB/TB (berat badan / tinggi badan dalam meter persegi)
        const tinggiMeter = item.tinggiBadanAnak / 100; // cm -> meter
        const bmi = item.beratBadanAnak / (tinggiMeter * tinggiMeter);

        if (bmi >= 18.5 && bmi <= 24.9) {
          giziBaik++;
        } else if (bmi >= 17 && bmi < 18.5) {
          kurangGizi++;
        } else if (bmi < 17) {
          giziBuruk++;
        }
      }
    });

    // Format data untuk grafik
    const chartData = [
      { status: "Gizi Baik", jumlah: giziBaik, fill: "hsl(var(--chart-2))" },
      {
        status: "Kurang Gizi",
        jumlah: kurangGizi,
        fill: "hsl(var(--chart-4))",
      },
      { status: "Gizi Buruk", jumlah: giziBuruk, fill: "hsl(var(--chart-1))" },
    ];

    return { success: true, data: chartData };
  } catch (error) {
    console.error("Gagal mengambil status gizi anak:", error);
    return { success: false, data: [], error: "Gagal mengambil data." };
  }
}
