"use server";

import { revalidatePath } from "next/cache";

import db from "@/lib/db";

export async function getTablePost() {
  try {
    const posts = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        image_url: true,
        is_premium: true,
        is_published: true,
        createdAt: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Gagal mengambil data blog:", error);
    throw new Error("Gagal mengambil data blog");
  }
}

export async function togglePostStatus(id: string, is_published: boolean) {
  try {
    await db.blog.update({
      where: { id },
      data: { is_published },
    });

    revalidatePath("/dashboard/tabel-berita-artikel");

    return { success: true, id, is_published };
  } catch (error) {
    console.error("Gagal mengubah status posting:", error);
    throw new Error("Gagal mengubah status posting");
  }
}

export async function deletePost(id: string) {
  try {
    if (!id) {
      throw new Error("ID tidak valid");
    }

    // Hapus relasi terkait secara manual terlebih dahulu
    await db.blog_content.deleteMany({
      where: { blog_id: id },
    });

    // Hapus data utama (blog)
    await db.blog.delete({
      where: { id },
    });

    // Revalidate path
    revalidatePath("/dashboard/tabel-berita-artikel");

    return { success: true, id };
  } catch (error) {
    console.error("Gagal menghapus posting:", error);

    return { success: false, message: "Gagal menghapus data blog." };
  }
}
