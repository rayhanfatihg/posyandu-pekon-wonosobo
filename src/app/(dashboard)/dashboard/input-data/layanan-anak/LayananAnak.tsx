"use client";

import * as React from "react";

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
import { ComboboxWarga } from "@/components/warga/ComboBoxWarga";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { saveDataLayananAnak } from "./action";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const layananSchema = z.object({
  ibuId: z.string().min(1, { message: "Wajib memilih nama ibu" }),
  ayahId: z.string().min(1, { message: "Wajib memilih nama ayah" }),
  anakId: z.string().min(1, { message: "Wajib memilih nama anak" }),
  
 
 
 
  
  alatKontrasepsi: z.string().optional(),
  tinggiBadanAnak: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Tinggi Badan Anak harus lebih dari 0" })
      .optional()
  ),
  beratBadanAnak: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Berat Badan Anak harus lebih dari 0" })
      .optional()
  ),
  umurAnak: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z.number().min(1, { message: "Umur Anak harus lebih dari 0" }).optional()
  ),
  lingkarLenganAnak: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar Lengan Anak harus lebih dari 0" })
      .optional()
  ),
  lingkarKepalaAnak: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar Kepala Anak harus lebih dari 0" })
      .optional()
  ),
});

type LayananFormValues = z.infer<typeof layananSchema>;

type LayananAnakFormProps = {
  value: string;
  label: string;
};

interface LayananAnakProps {
  data: LayananAnakFormProps[];
}

const LayananAnak: React.FC<LayananAnakProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      ibuId: "",
      ayahId: "",
      anakId: "",
      tinggiBadanAnak: 0,
      beratBadanAnak: 0,
      lingkarLenganAnak: 0,
      lingkarKepalaAnak: 0,
    },
  });

  const onSubmit = async (data: LayananFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await saveDataLayananAnak(data);

      if (result.success) {
        toast({
          title: "Data berhasil disimpan!",
          description: "Data layanan ibu-anak berhasil disimpan",
        });
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
    form.reset();

    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-[310px] flex-col space-y-6 rounded-md sm:w-[400px]"
      >
        {/* Pilih Nama Ibu */}
        <FormField
          control={form.control}
          name="ibuId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Nama Ibu</Label>
              <FormControl>
                <ComboboxWarga
                  options={data}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Pilih nama ibu..."
                />
              </FormControl>
              <FormMessage>{form.formState.errors.ibuId?.message}</FormMessage>
            </FormItem>
          )}
        />

      

        {/* Pilih Nama Ayah */}
        <FormField
          control={form.control}
          name="ayahId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Nama Ayah</Label>
              <FormControl>
                <ComboboxWarga
                  options={data}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Pilih nama ayah..."
                />
              </FormControl>
              <FormMessage>{form.formState.errors.ayahId?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Pilih Nama Anak/Balita */}
        <FormField
          control={form.control}
          name="anakId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Pilih Nama Anak/Balita</Label>
              <FormControl>
                <ComboboxWarga
                  options={data}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Pilih nama anak/balita..."
                />
              </FormControl>
              <FormMessage>{form.formState.errors.anakId?.message}</FormMessage>
            </FormItem>
          )}
        />


        {/* Berat Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="beratBadanAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Berat Badan Anak/Balita (kg)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Berat Badan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.beratBadanAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Tinggi Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="tinggiBadanAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Badan Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Tinggi Badan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiBadanAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Lengan Anak/Balita */}
        <FormField
          control={form.control}
          name="lingkarLenganAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Lengan Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarLenganAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lingkarKepalaAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Kepala Anak/Balita (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan Anak/Balita"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarKepalaAnak?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          {isSubmitting ? "Menyimpan..." : "Simpan Data"}
        </Button>
      </form>
    </Form>
  );
};

export default LayananAnak;
