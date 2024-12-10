"use client";

import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { togglePostStatus, deletePost } from "./action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InteractiveButtonProps {
  id: string;
  isCurrentlyPublished: boolean;
}

export default function InteractiveButton({
  id,
  isCurrentlyPublished,
}: InteractiveButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      const newStatus = !isCurrentlyPublished; // Toggle status
      const response = await togglePostStatus(id, newStatus);

      if (response.success) {
        toast({
          title: "Berhasil",
          description: `Post berhasil diubah menjadi ${
            response.is_published ? "Terposting" : "Tidak Terposting"
          }`,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengubah status posting.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deletePost(id);

      if (response.success) {
        toast({
          title: "Berhasil",
          description: "Berita berhasil dihapus.",
        });

        // Optional: Refresh halaman atau data setelah penghapusan
        window.location.reload();
      } else {
        throw new Error("Gagal menghapus berita.");
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: `${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Tombol untuk Toggle Status */}
      <button
        onClick={handleToggle}
        className={`rounded px-4 py-2 text-sm font-medium ${
          isCurrentlyPublished
            ? "bg-green-800 text-white hover:bg-green-900"
            : "bg-gray-800 text-white hover:bg-gray-900"
        }`}
      >
        {isCurrentlyPublished ? "Terposting" : "Tidak Terposting"}
      </button>

      {/* Alert Dialog untuk Konfirmasi Hapus */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="rounded px-4 py-2 text-sm font-medium bg-red-700 text-white hover:bg-red-800">
            Hapus
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Anda yakin ingin menghapus berita ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data berita akan dihapus
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
