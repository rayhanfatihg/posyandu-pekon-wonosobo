"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { editLayananIbuAnak } from "./action";
import { toast } from "@/hooks/use-toast";

// Schema Zod untuk Validasi Form
const layananSchema = z.object({
  tinggiBadanIbu: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Tinggi badan ibu harus valid").optional()
  ),
  beratBadanIbu: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Berat badan ibu harus valid").optional()
  ),
  lingkarLenganIbu: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar lengan ibu harus valid").optional()
  ),
  lingkarPinggangIbu: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar pinggang ibu harus valid").optional()
  ),
  alatKontrasepsi: z.string().optional(),
  tinggiBadanAnak: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Tinggi badan anak harus valid").optional()
  ),
  beratBadanAnak: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Berat badan anak harus valid").optional()
  ),
  umurAnak: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Umur anak harus valid").optional()
  ),
  lingkarLenganAnak: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar lengan anak harus valid").optional()
  ),
  lingkarKepalaAnak: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar kepala anak harus valid").optional()
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

export default function EditLayanan({
  open,
  onClose,
  onConfirm,
  isEditing,
  row_edit,
}: EditLayananProps) {
  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      tinggiBadanIbu: getSanitizedValue(row_edit?.getValue("tinggiBadanIbu")),
      beratBadanIbu: getSanitizedValue(row_edit?.getValue("beratBadanIbu")),
      lingkarLenganIbu: getSanitizedValue(
        row_edit?.getValue("lingkarLenganIbu")
      ),
      lingkarPinggangIbu: getSanitizedValue(
        row_edit?.getValue("lingkarPinggangIbu")
      ),
      alatKontrasepsi: getSanitizedValue(row_edit?.getValue("alatKontrasepsi")),
      tinggiBadanAnak: getSanitizedValue(row_edit?.getValue("tinggiBadanAnak")),
      beratBadanAnak: getSanitizedValue(row_edit?.getValue("beratBadanAnak")),
      umurAnak: getSanitizedValue(row_edit?.getValue("umurAnak")),
      lingkarLenganAnak: getSanitizedValue(
        row_edit?.getValue("lingkarLenganAnak")
      ),
      lingkarKepalaAnak: getSanitizedValue(
        row_edit?.getValue("lingkarKepalaAnak")
      ),
    },
  });

  const handleEdit = async (data: any) => {
    const response = await editLayananIbuAnak(
      row_edit?.getValue("id_layanan"),
      data
    );

    if (response.success) {
      toast({
        title: "Berhasil",
        description: response.message,
      });
      onClose(); // Tutup modal setelah sukses
      window.location.reload(); // Refresh halaman
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
            <AlertDialogTitle>Edit Data Layanan Ibu-Anak</AlertDialogTitle>
          </AlertDialogHeader>

          <form
            onSubmit={form.handleSubmit(handleEdit)}
            className="flex flex-col gap-4 p-2"
          >
            {[
              { label: "Tinggi Badan Ibu (cm)", name: "tinggiBadanIbu" },
              { label: "Berat Badan Ibu (kg)", name: "beratBadanIbu" },
              { label: "Lingkar Lengan Ibu (cm)", name: "lingkarLenganIbu" },
              {
                label: "Lingkar Pinggang Ibu (cm)",
                name: "lingkarPinggangIbu",
              },
              { label: "Alat Kontrasepsi", name: "alatKontrasepsi" },
              { label: "Tinggi Badan Anak (cm)", name: "tinggiBadanAnak" },
              { label: "Berat Badan Anak (kg)", name: "beratBadanAnak" },
              { label: "Lingkar Lengan Anak (cm)", name: "lingkarLenganAnak" },
              { label: "Lingkar Kepala Anak (cm)", name: "lingkarKepalaAnak" },
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
