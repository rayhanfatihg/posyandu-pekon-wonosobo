"use server";

import db from "@/lib/db"; // Assuming db is set up with Prisma
import { createClient } from "@/utils/supabase/server"; // If using Supabase authentication
import { revalidatePath } from "next/cache";

export async function saveDataLayananLansia(data: {
  wargaId: string;
  beratBadan?: number;
  tinggiBadan?: number;
  asamUrat?: number; // Optional field
  gulaDarah?: number; // Optional field
  keterangan?: string;
  kolesterol?: number; // Optional field
  lingkarPerut?: number; // Optional field
  tensiDarah?: string;
}) {
  try {
    // Step 1: Ensure the user is authenticated
    const user = await (await createClient()).auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Anda belum login",
      };
    }

    // Step 2: Check if the Warga (citizen) exists
    const warga = await db.warga.findUnique({
      where: { id: data.wargaId },
    });

    if (!warga) {
      return {
        success: false,
        error: "Warga tidak ditemukan",
      };
    }

    // Step 3: Save the Layanan Lansia data
    await db.layananLansia.create({
      data: {
        wargaId: data.wargaId,
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        asamUrat: data.asamUrat ?? null, // If not provided, set as null
        gulaDarah: data.gulaDarah ?? null, // If not provided, set as null
        keterangan: data.keterangan,
        kolesterol: data.kolesterol ?? null, // If not provided, set as null
        lingkarPerut: data.lingkarPerut ?? null, // If not provided, set as null
        tensiDarah: data.tensiDarah,
      },
    });

    revalidatePath("(dashboard)/dashboard/input-data");
    return { success: true };
  } catch (error) {
    console.error("Error saving Layanan Lansia data:", error);
    return { success: false, error: "Terjadi kesalahan pada server" };
  }
}

export async function getAllDataWarga() {
  try {
    const warga = await db.warga.findMany();
    return {
      success: true,
      data: warga,
    };
  } catch (error) {
    console.error("Error fetching Warga data:", error);
    return {
      success: false,
      error: "Terjadi kesalahan saat mengambil data warga",
    };
  }
}
