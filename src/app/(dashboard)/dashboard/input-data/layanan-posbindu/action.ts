"use server";

import { createClient } from "@/utils/supabase/server"; // If using Supabase authentication
import db from "@/lib/db"; // Assuming db is set up with Prisma
import { revalidatePath } from "next/cache";

export async function saveDataLayananPosbindu(data: {
  wargaId: string;
  beratBadan?: number;
  tinggiBadan?: number;
  keterangan?: string;
  lingkarPerut?: number; // Optional field
  lingkarLengan?: number;
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
    await db.layananPosbindu.create({
      data: {
        wargaId: data.wargaId,
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        lingkarLengan: data.lingkarLengan,
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
