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
import { editLayananIbuHamil } from "./action";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema Zod untuk Validasi Form
const layananSchema = z.object({
  beratBadan: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Berat badan harus valid")
  ),
  tinggiBadan: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Tinggi badan harus valid")
  ),
  
  lingkarLengan: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar perut harus valid")
  ),
  tinggiPundus: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar perut harus valid")
  ),

  umurKehamilan: z.preprocess(
    (val) => (val === "" ? undefined : parseFloat(val as string)),
    z.number().min(1, "Lingkar perut harus valid")
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

export default function EditLayananLansia({
  open,
  onClose,
  onConfirm,
  isEditing,
  row_edit,
}: EditLayananProps) {
  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      beratBadan: getSanitizedValue(row_edit?.getValue("beratBadan")),
      tinggiBadan: getSanitizedValue(row_edit?.getValue("tinggiBadan")),
      lingkarLengan: getSanitizedValue(row_edit?.getValue("lingkarLengan")),
      tinggiPundus: getSanitizedValue(row_edit?.getValue("tinggiPundus")),
      umurKehamilan: getSanitizedValue(row_edit?.getValue("umurKehamilan")),
    },
  });

  const handleSubmit = async (data: LayananFormValues) => {
    const response = await editLayananIbuHamil(
      row_edit?.getValue("id_layanan"),
      data
    );

    if (response.success) {
      toast({
        title: "Berhasil",
        description: "Data layanan Ibu Hamil berhasil diperbarui.",
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
            <AlertDialogTitle>Edit Data Layanan Lansia</AlertDialogTitle>
          </AlertDialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 p-2"
          >
            {[
              { label: "Berat Badan (kg)", name: "beratBadan" },
              { label: "Tinggi Badan (cm)", name: "tinggiBadan" },
              { label: "Lingkar Lengan (cm)", name: "lingkarLengan" },
              { label: "Umur Kehamilan", name: "umurKehamilan" },
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
