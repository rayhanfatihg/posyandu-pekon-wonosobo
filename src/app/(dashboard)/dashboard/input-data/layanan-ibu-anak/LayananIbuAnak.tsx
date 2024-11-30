"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxWarga } from "@/components/warga/ComboBoxWarga";
import { saveDataLayananIbuAnak } from "./action";
import { Loader2Icon } from "lucide-react";

const layananSchema = z.object({
  ibuId: z.string().min(1, { message: "Wajib memilih nama ibu" }),
  ayahId: z.string().min(1, { message: "Wajib memilih nama ayah" }),
  anakId: z.string().min(1, { message: "Wajib memilih nama anak" }),
  jenisKelaminAnak: z.enum(["LAKI_LAKI", "PEREMPUAN"], {
    errorMap: () => ({ message: "Jenis Kelamin wajib dipilih" }),
  }),
  tinggiBadanIbu: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Tinggi Badan Ibu harus lebih dari 0" })
      .optional()
  ),
  beratBadanIbu: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Berat Badan Ibu harus lebih dari 0" })
      .optional()
  ),
  lingkarLenganIbu: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar lengan Ibu harus lebih dari 0" })
      .optional()
  ),
  lingkarPinggangIbu: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar pinggang Ibu harus lebih dari 0" })
      .optional()
  ),
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

type LayananIbuAnakFormProps = {
  value: string;
  label: string;
};

interface LayananIbuAnakProps {
  data: LayananIbuAnakFormProps[];
}

const LayananIbuAnak: React.FC<LayananIbuAnakProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<LayananFormValues>({
    resolver: zodResolver(layananSchema),
    defaultValues: {
      ibuId: "",
      ayahId: "",
      anakId: "",
      jenisKelaminAnak: "LAKI_LAKI",
      tinggiBadanIbu: undefined,
      beratBadanIbu: undefined,
      lingkarLenganIbu: undefined,
      lingkarPinggangIbu: undefined,
      alatKontrasepsi: "",
      tinggiBadanAnak: undefined,
      beratBadanAnak: undefined,
      umurAnak: undefined,
      lingkarLenganAnak: undefined,
      lingkarKepalaAnak: undefined,
    },
  });

  const onSubmit = async (data: LayananFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await saveDataLayananIbuAnak(data);

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
    setIsSubmitting(false);

    window.location.reload();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex w-[310px] flex-col space-y-2 rounded-md sm:w-[400px]"
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

        {/* Tinggi Badan Ibu */}
        <FormField
          control={form.control}
          name="tinggiBadanIbu"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Badan Ibu (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Tinggi Badan Ibu"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiBadanIbu?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Berat Badan Ibu */}
        <FormField
          control={form.control}
          name="beratBadanIbu"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Berat Badan Ibu (kg)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Berat Badan Ibu"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.beratBadanIbu?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Lengan Ibu */}
        <FormField
          control={form.control}
          name="lingkarLenganIbu"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Lengan Ibu (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan Ibu"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarLenganIbu?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Pinggang Ibu */}
        <FormField
          control={form.control}
          name="lingkarPinggangIbu"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Pinggang Ibu (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Pinggang Ibu"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarPinggangIbu?.message}
              </FormMessage>
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

        <FormField
          control={form.control}
          name="jenisKelaminAnak"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Jenis Kelamin Anak</Label>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue="LAKI_LAKI"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                    <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.jenisKelaminAnak?.message}
              </FormMessage>
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

        {/* Alat Kontrasepsi */}
        <FormField
          control={form.control}
          name="alatKontrasepsi"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Alat Kontrasepsi</Label>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="border border-primary">
                    <SelectValue placeholder="Pilih alat kontrasepsi" />
                  </SelectTrigger>
                  <SelectContent className="border border-primary">
                    <SelectItem value="SUNTIK">Suntik</SelectItem>
                    <SelectItem value="IMPLAN">Implan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.alatKontrasepsi?.message}
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

export default LayananIbuAnak;
