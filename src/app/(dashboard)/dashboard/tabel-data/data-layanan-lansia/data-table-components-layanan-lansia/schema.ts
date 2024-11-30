// types/layananLansia.ts

export interface LayananLansia {
  id: string;
  wargaId: string;
  beratBadan?: number | null;
  tinggiBadan?: number | null;
  asamUrat?: number | null;
  gulaDarah?: number | null;
  keterangan?: string | null;
  kolesterol?: number | null;
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
    dusun?: string;
  };
}
