// types/layananLansia.ts

export interface LayananLansia {
  id: string;
  id_layanan?: string;
  wargaId: string;
  beratBadan?: number | null;
  tinggiBadan?: number | null;
  lingkarPerut?: number | null;
  tensiDarah?: string | null;
  createdAt: string; // ISO String Date
  updatedAt: string; // ISO String Date

  // Relations
  warga: {
    id: string;
    nama: string;
    nik: string;
    tanggalLahir: string;
    umur: number;
  };
}
