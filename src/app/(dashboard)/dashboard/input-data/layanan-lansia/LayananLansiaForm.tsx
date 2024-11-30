"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveDataLayananLansia } from "./action";
import React from "react";
import { ComboboxWarga } from "@/components/warga/ComboBoxWarga";
import { Loader2Icon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Zod validation schema for Layanan Lansia
const layananLansiaSchema = z.object({
  wargaId: z.string().min(1, { message: "Warga ID wajib diisi" }),
  beratBadan: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Berat Badan harus lebih dari 0" })
  ),
  tinggiBadan: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Tinggi Badan harus lebih dari 0" })
  ),
  asamUrat: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().optional()
  ),
  gulaDarah: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().optional()
  ),
  keterangan: z.string().min(1, { message: "Keterangan wajib diisi" }),
  kolesterol: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().optional()
  ),
  lingkarPerut: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().optional()
  ),
  tensiDarah: z.string().min(1, { message: "Tensi darah wajib diisi" }),
});

type LayananLansiaFormValues = z.infer<typeof layananLansiaSchema>;

interface LayananLansiaFormProps {
  value: string;
  label: string;
}

export default function LayananLansiaForm({
  data,
}: {
  data: LayananLansiaFormProps[];
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<LayananLansiaFormValues>({
    resolver: zodResolver(layananLansiaSchema),
    defaultValues: {
      wargaId: "",
      beratBadan: undefined,
      tinggiBadan: undefined,
      asamUrat: undefined,
      gulaDarah: undefined,
      keterangan: "",
      kolesterol: undefined,
      lingkarPerut: undefined,
      tensiDarah: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: LayananLansiaFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await saveDataLayananLansia(data); // Calling server action

      if (result.success) {
        toast({
          title: "Data berhasil disimpan!",
          description: "Data layanan lansia berhasil disimpan",
        });
        form.reset();
      } else {
        toast({
          title: "Gagal menyimpan data!",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        title: "Terjadi kesalahan!",
        description: "Gagal mengirim data.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);

    window.location.reload();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-[310px] flex-col space-y-2 rounded-md sm:w-[400px]"
      >
        {/* Warga ID Selection */}
        <FormField
          control={form.control}
          name="wargaId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Nama Lansia</Label>
              <FormControl>
                <ComboboxWarga
                  options={data}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Cari nama lansia dari daftar..."
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.wargaId?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Berat Badan */}
        <FormField
          control={form.control}
          name="beratBadan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Berat Badan (kg)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Berat badan dalam kilogram"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.beratBadan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Tinggi Badan */}
        <FormField
          control={form.control}
          name="tinggiBadan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Badan (cm)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Tinggi badan dalam sentimeter"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiBadan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Asam Urat */}
        <FormField
          control={form.control}
          name="asamUrat"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Asam Urat (mg/dL)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Kadar asam urat dalam mg/dL"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.asamUrat?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Gula Darah */}
        <FormField
          control={form.control}
          name="gulaDarah"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Gula Darah (mg/dL)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Kadar gula darah dalam mg/dL"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.gulaDarah?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Kolesterol */}
        <FormField
          control={form.control}
          name="kolesterol"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Kolesterol (mg/dL)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Kadar kolesterol dalam mg/dL"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.kolesterol?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Perut */}
        <FormField
          control={form.control}
          name="lingkarPerut"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Perut (cm)</Label>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  placeholder="Lingkar perut dalam sentimeter"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarPerut?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Tensi Darah */}
        <FormField
          control={form.control}
          name="tensiDarah"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tensi Darah</Label>
              <FormControl>
                <Input {...field} placeholder="Tensi darah (misalnya 120/80)" />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tensiDarah?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Keterangan */}
        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Keterangan</Label>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tulis keterangan tambahan (opsional)"
                  className="max-h-24"
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.keterangan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          {isSubmitting ? "Menyimpan..." : "Simpan Data"}
        </Button>
      </form>
    </Form>
  );
}
