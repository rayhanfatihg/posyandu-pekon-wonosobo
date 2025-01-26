"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { saveDataWarga } from "./action";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const wargaSchema = z
  .object({
    nama: z.string().min(1, { message: "Nama wajib diisi" }),
    nik: z
      .string()
      .min(16, { message: "NIK harus 16 karakter" })
      .max(16, { message: "NIK harus 16 karakter" }),
    tanggalLahir: z.string().refine((value) => !isNaN(Date.parse(value)), {
      message: "Tanggal Lahir tidak valid",
    }),
    dusun: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    Object.keys(data).forEach((key) => {
      if (
        data[key as keyof typeof data] === undefined ||
        data[key as keyof typeof data] === ""
      ) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: "Data wajib diisi terlebih dahulu", // Pesan default
        });
      }
    });
  });

export type WargaFormValues = z.infer<typeof wargaSchema>;

export default function InputDataWarga() {
  const form = useForm<WargaFormValues>({
    resolver: zodResolver(wargaSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      nik: "",
      tanggalLahir: "",
      
    },
  });

  const onSubmit = async (data: WargaFormValues) => {
    const age =
      new Date().getFullYear() - new Date(data.tanggalLahir).getFullYear();
    const wargaDataWithAge = {
      ...data,
      tanggalLahir: new Date(data.tanggalLahir),
      umur: age,
    };

    console.log("Payload to saveDataWarga:", wargaDataWithAge);

    const result = await saveDataWarga(wargaDataWithAge);

    if (result.success) {
      toast({
        title: "Data berhasil disimpan",
        description: "Data warga berhasil disimpan",
      });
    } else {
      toast({
        title: "Gagal menyimpan data",
        description: result.error || "Terjadi kesalahan saat menyimpan data",
        variant: "destructive",
      });
    }

    form.reset();
  };

  return (
    <main className="min-h-screen w-screen max-w-5xl flex flex-col justify-center items-center md:justify-start md:items-start">
      <h1 className="mb-2 text-2xl font-bold">Tambah Data Warga</h1>

      <h2 className="text-sm max-w-sm">
        Tambah data warga digunakan cukup sekali daftar, jika warga sudah
        terdaftar tidak perlu mendaftar ulang
      </h2>

      <div className="mb-6 mt-10 mx-auto w-fit md:mx-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex min-w-[300px] flex-col space-y-6 rounded-md sm:w-[400px]"
          >
            {/* Nama Field */}
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <FormControl>
                    <Input
                      id="nama"
                      placeholder="Masukkan nama lengkap"
                      {...field}
                      value={field.value ?? ""} // Ensure it's always controlled
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.nama?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* NIK Field */}
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                  <FormControl>
                    <Input
                      id="nik"
                      placeholder="Masukkan NIK 16 digit"
                      {...field}
                      value={field.value ?? ""} // Ensure it's always controlled
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.nik?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Tanggal Lahir Field */}
            <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                  <FormControl>
                    <Input
                      id="tanggalLahir"
                      type="date"
                      placeholder="Masukkan tanggal lahir"
                      {...field}
                      value={field.value ?? ""} // Ensure it's always controlled
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.tanggalLahir?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            

            <div className="flex w-full">
              <Button
                type="submit"
                className="mt-5 w-full"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                {form.formState.isSubmitting ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
