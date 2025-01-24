"use server";

import { LayananIbuHamil } from './../../../../../../node_modules/.prisma/client/index.d';
import { createClient } from "@/utils/supabase/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveDataLayananIbuHamil(data: {
  bumilId: string;
  tinggiBadan?: number;
  beratBadan?: number;
  lingkarLengan?: number;
  tinggiPundus?: number;
  umurKehamilan?: number;
}) {
  try {
    // Validasi apakah user sudah login
    const user = await (await createClient()).auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Anda belum login",
      };
    }

    // Validasi apakah warga Ibu, Ayah, dan Anak ada di database
    const warga = await db.warga.findUnique({
        where: { id: data.bumilId },
      });
  
      if (!warga) {
        return {
          success: false,
          error: "Warga tidak ditemukan",
        };
      }

   

    // Menyimpan data layanan ibu-anak dengan umur anak yang dihitung
    await db.layananIbuHamil.create({
      data: {
        bumilId: data.bumilId,
        tinggiBadan: data.tinggiBadan,
        beratBadan: data.beratBadan,
        lingkarLengan: data.lingkarLengan,
        tinggiPundus: data.tinggiPundus,
      },
    });

    revalidatePath("(dashboard)/dashboard/input-data");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: "Gagal menyimpan data karena error tak terduga",
    };
  }
}