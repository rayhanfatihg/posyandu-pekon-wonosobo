"use server";

import db from "@/lib/db";
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


// Fetch data from LayananIbuAnak and related tables
export async function getDataLayananAnak() {
  try {
    // Fetch data from LayananIbuAnak table with relations to Warga (Anak, Ibu, Ayah)
    const layananData = await db.layananAnak.findMany({
      select: {
        id: true,
        tinggiBadanAnak: true,
        beratBadanAnak: true,
        lingkarLenganAnak: true,
        lingkarKepalaAnak: true,
        createdAt: true,
        anakId: true,
        ayahId: true,
        ibuId: true,
        warga_LayananAnak_anakIdTowarga: {
          select: {
            id: true,
            nama: true,
            nik: true,
            tanggalLahir: true,
          },
        },
        warga_LayananAnak_ayahIdTowarga: {
          select: {
            id: true,
            nama: true,
            nik: true,
          },
        },
        warga_LayananAnak_ibuIdTowarga: {
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
      const umurFormatted = item.warga_LayananAnak_anakIdTowarga?.tanggalLahir
        ? calculateAge(new Date(item.warga_LayananAnak_anakIdTowarga?.tanggalLahir))
        : null;

      return {
        id_layanan: item.id,
        namaAnak: item.warga_LayananAnak_anakIdTowarga?.nama,
        nikAnak: item.warga_LayananAnak_anakIdTowarga?.nik,
        namaIbu: item.warga_LayananAnak_ibuIdTowarga?.nama,
        nikIbu: item.warga_LayananAnak_ibuIdTowarga?.nik,
        namaAyah: item.warga_LayananAnak_ayahIdTowarga?.nama,
        nikAyah: item.warga_LayananAnak_ayahIdTowarga?.nik,
        tinggiBadanAnak: item.tinggiBadanAnak ?? null,
        beratBadanAnak: item.beratBadanAnak ?? null,
        umurAnak: umurFormatted,
        lingkarLenganAnak: item.lingkarLenganAnak ?? null,
        lingkarKepalaAnak: item.lingkarKepalaAnak ?? null,
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
