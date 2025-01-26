

// types/layananLansia.ts

export interface LayananIbuHamil {
  id: string;
  id_layanan?: string;
  wargaId: string;
  beratBadan?: number | null;
  tinggiBadan?: number | null;
  tinggiPundus?: number | null;
  lingkarLengan?: string | null;
  createdAt: string; // ISO String Date
  updatedAt: string; // ISO String Date

  // Relations
  warga: {
    id: string;
    nama: string;
    nik: string;
    tanggalLahir: string;
  };
}
