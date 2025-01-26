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
import { saveDataLayananIbuHamil } from "./action";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const layananIbuHamilSchema = z.object({
  bumilId: z.string().min(1, { message: "Wajib memilih nama ibu" }),
  
  tinggiBadan: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Tinggi Badan harus lebih dari 0" })
      .optional()
  ),
  beratBadan: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Berat Badan  harus lebih dari 0" })
      .optional()
  ),
  
  lingkarLengan: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar Lengan  harus lebih dari 0" })
      .optional()
  ),
  tinggiPundus: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z
      .number()
      .min(1, { message: "Lingkar Kepala Anak harus lebih dari 0" })
      .optional()
  ),

  umurKehamilan: z.preprocess(
    (val) => (val === undefined ? undefined : parseFloat(val as string)),
    z.number().min(1, { message: "Harus lebih dari 0" }).optional()
  ),
});

type LayananIbuHamilFormValues = z.infer<typeof layananIbuHamilSchema>;

type LayananIbuHamilFormProps = {
  value: string;
  label: string;
};

interface LayananIbuHamilProps {
  data: LayananIbuHamilFormProps[];
}

const LayananIbuHamil: React.FC<LayananIbuHamilProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();

  const form = useForm<LayananIbuHamilFormValues>({
    resolver: zodResolver(layananIbuHamilSchema),
    defaultValues: {
    bumilId: "",
    tinggiBadan: undefined,
    beratBadan: undefined,
    lingkarLengan: undefined,
    tinggiPundus: undefined,
    umurKehamilan: undefined,
    
    },
  });

  const onSubmit = async (data: LayananIbuHamilFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await saveDataLayananIbuHamil(data);

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
          name="bumilId"
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
              <FormMessage>{form.formState.errors.bumilId?.message}</FormMessage>
            </FormItem>
          )}
        />

      

    


        {/* Berat Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="beratBadan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Berat Badan </Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Berat Badan "
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.beratBadan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Tinggi Badan Anak/Balita */}
        <FormField
          control={form.control}
          name="tinggiBadan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Badan </Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Tinggi Badan"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiBadan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Lingkar Lengan Anak/Balita */}
        <FormField
          control={form.control}
          name="lingkarLengan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Lingkar Lengan</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan Lingkar Lengan "
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.lingkarLengan?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tinggiPundus"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Tinggi Pundus (cm)</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan tinggi pundus"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiPundus?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="umurKehamilan"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label>Umur kehamilan</Label>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Masukkan umur kehamilan"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.tinggiPundus?.message}
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

export default LayananIbuHamil;