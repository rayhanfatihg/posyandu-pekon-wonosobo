"use server";

import fs from "fs";
import path from "path";

export async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/(dashboard)/dashboard/tabel-data/data-layanan-ibuanak/data-table-components-layanan-ibu-anak",
    "data-mock.json"
  );

  const data = fs.readFileSync(filePath, "utf8");

  return JSON.parse(data);
}

import db from "@/lib/db";
// Fetch data from LayananIbuAnak and related tables
export async function getDataLayananIbuAnak() {
  try {
    // Fetch data from LayananIbuAnak table with relations to Warga (Anak, Ibu, Ayah)
    const layananData = await db.layananIbuAnak.findMany({
      select: {
        id: true,
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
        jenisKelaminAnak: true,
        createdAt: true,
        anakId: true,
        ayahId: true,
        ibuId: true,
        anak: {
          select: {
            id: true,
            nama: true,
            nik: true,
            tanggalLahir: true,
            umur: true,
          },
        },
        ayah: {
          select: {
            id: true,
            nama: true,
            nik: true,
          },
        },
        ibu: {
          select: {
            id: true,
            nama: true,
            nik: true,
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

    const calculateAge = (tanggalLahir: Date) => {
      const today = new Date();
      let years = today.getFullYear() - tanggalLahir.getFullYear();
      let months = today.getMonth() - tanggalLahir.getMonth();

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const totalMonths = years * 12 + months;

      if (totalMonths < 12) {
        return `${totalMonths} bulan`;
      } else {
        return `${years} tahun ${months} bulan`;
      }
    };

    // Format the data to match the mock structure
    const formattedData = layananData.map((item) => {
      const umurFormatted = item.anak.tanggalLahir
        ? calculateAge(new Date(item.anak.tanggalLahir))
        : null;

      return {
        id_layanan: item.id,
        namaAnak: item.anak.nama,
        nikAnak: item.anak.nik,
        namaIbu: item.ibu.nama,
        nikIbu: item.ibu.nik,
        namaAyah: item.ayah.nama,
        nikAyah: item.ayah.nik,
        tinggiBadanAnak: item.tinggiBadanAnak ?? null,
        beratBadanAnak: item.beratBadanAnak ?? null,
        umurAnak: umurFormatted,
        lingkarLenganAnak: item.lingkarLenganAnak ?? null,
        lingkarKepalaAnak: item.lingkarKepalaAnak ?? null,
        tinggiBadanIbu: item.tinggiBadanIbu ?? null,
        beratBadanIbu: item.beratBadanIbu ?? null,
        lingkarLenganIbu: item.lingkarLenganIbu ?? null,
        lingkarPinggangIbu: item.lingkarPinggangIbu ?? null,
        alatKontrasepsi: item.alatKontrasepsi ?? null,
        jenisKelaminAnak: item.jenisKelaminAnak,
        date: formatDate(item.createdAt),
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Gagal mengambil data layanan ibu dan anak:", error);
    throw new Error("Gagal mengambil data layanan ibu dan anak");
  }
}

// You can implement additional logic like toggling a post status (if needed)
// Just like in the example provided (for revalidation or updates)
