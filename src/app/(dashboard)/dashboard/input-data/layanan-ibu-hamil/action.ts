"use server";

import { JenisKelamin } from "@prisma/client";
import { createClient } from "@/utils/supabase/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
