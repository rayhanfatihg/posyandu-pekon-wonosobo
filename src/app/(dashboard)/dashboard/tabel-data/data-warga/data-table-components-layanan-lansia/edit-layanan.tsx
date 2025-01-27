"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editWarga } from "./action";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Zod untuk Validasi Form
const layananSchema = z.object({
  nama: z.string(),
  nik: z.string(),
  tanggalLahir: z.preprocess(
    (val) => (typeof val === "string" || val instanceof Date ? new Date(val) : undefined),
    z.date({ required_error: "Tanggal Lahir harus diisi", invalid_type_error: "Tanggal Lahir harus berupa tanggal yang valid" })
  ),
 
});

type LayananFormValues = z.infer<typeof layananSchema>;

interface EditLayananProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: LayananFormValues) => void;
  isEditing: boolean;
  row_edit: any; // Data dari row yang dipilih
}

// Helper untuk sanitasi nilai awal
const getSanitizedValue = (value: any) =>
  value === null || value === undefined ? "" : value;

export default function EditWarga({
  open,
  onClose,
  onConfirm,
  isEditing,
  row_edit,
}: EditLayananProps) {
  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      nama: getSanitizedValue(row_edit?.getValue("nama")),
      nik: getSanitizedValue(row_edit?.getValue("nik")),
      tanggalLahir: getSanitizedValue(row_edit?.getValue("tanggalLahir")),
    },
  });

  const handleSubmit = async (data: LayananFormValues) => {
    const response = await editWarga(
      row_edit?.getValue("id_layanan"),
      data
    );

    if (response.success) {
      toast({
        title: "Berhasil",
        description: "Data layanan lansia berhasil diperbarui.",
      });
      onClose();

      window.location.reload();
      // Refresh data tabel jika perlu
    } else {
      toast({
        title: "Gagal",
        description: response.error,
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <ScrollArea className="max-h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Data Warga</AlertDialogTitle>
          </AlertDialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 p-2"
          >
            {[
              { label: "Nama", name: "nama" },
              { label: "NIK", name: "nik" },
              { label: "Tanggal Lahir", name: "tanggalLahir" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-medium">{field.label}</label>
                <Input
                  type="text"
                  placeholder={`Masukkan ${field.label}`}
                  {...form.register(field.name as keyof LayananFormValues)}
                />
              </div>
            ))}

            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose}>Batal</AlertDialogCancel>
              <Button type="submit" disabled={isEditing}>
                {isEditing ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </AlertDialogFooter>
          </form>

          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
}
