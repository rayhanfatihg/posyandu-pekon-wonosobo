export interface Anak {
  id: number;
  nama: string;
  nik: string;
  tanggalLahir: string;
  umur: number;
}

export interface Ayah {
  id: number;
  nama: string;
  nik: string;
}

export interface Ibu {
  id: number;
  nama: string;
  nik: string;
}

export interface LayananAnak {
  id: number;
  tinggiBadanAnak: number | null;
  beratBadanAnak: number | null;
  umurAnak: number | null;
  lingkarLenganAnak: number | null;
  lingkarKepalaAnak: number | null;
  createdAt: Date;
  anakId: number;
  ayahId: number;
  ibuId: number;
  anak: Anak;
  ayah: Ayah;
  ibu: Ibu;
}

export interface FormattedLayananIbuAnak {
  id_layanan: string;
  namaAnak: string;
  namaIbu: string;
  namaAyah: string;
  tinggiBadanAnak: number | null;
  beratBadanAnak: number | null;
  umurAnak: string | null;
  lingkarLenganAnak: number | null;
  lingkarKepalaAnak: number | null;
  date: string;
}
