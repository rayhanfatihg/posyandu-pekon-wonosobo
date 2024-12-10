import { redirect } from "next/navigation";
import { ChartDemo1 } from "@/components/(dashboard)/charts/chart1";
import { ChartDemo2 } from "@/components/(dashboard)/charts/chart2";
import { ChartDemo3 } from "@/components/(dashboard)/charts/chart3";
import { ChartDemo5 } from "@/components/(dashboard)/charts/chart5";
import { ChartDemo6 } from "@/components/(dashboard)/charts/chart6";

import getUser from "@/utils/supabase/getUser";
import {
  getJadwalPosyandu,
  getLayananIbuAnakStats,
  getLayananLansiaStats,
  getWargaStats,
} from "./action";
import { DashboardCard } from "@/components/(dashboard)/DashboardCard";

export default async function DashboardPage() {
  // Auth Check
  const user = await getUser();
  if (!user) return redirect("/login");

  // Fetch Data
  const [wargaStats, layananIbuAnakStats, layananLansiaStats] =
    await Promise.all([
      getWargaStats(),
      getLayananIbuAnakStats(),
      getLayananLansiaStats(),
    ]);

  const layananIbuAnakCount = layananIbuAnakStats.length;
  const layananLansiaCount = layananLansiaStats.length;

  return (
    <main className="flex min-h-screen w-full flex-col justify-start">
      <h1 className="text-2xl font-bold">Dashboard Monitoring</h1>

      <div className="mt-10">
        <h2 className="font-bold">Laporan Grafik Data Posyandu</h2>
      </div>

      {/* Cards */}
      <div className="md:flex gap-1 mt-5 grid grid-cols-2 justify-center items-center md:justify-start md:items-start">
        <DashboardCard
          title="Jumlah Data Warga"
          description="Jumlah total warga yang tercatat"
          value={wargaStats.totalWarga}
          unit="Penduduk"
        />
        <DashboardCard
          title="Rata-Rata Umur"
          description="Rata-rata umur seluruh warga"
          value={parseInt(String(wargaStats.rataRataUmur))}
          unit="Tahun"
        />
        <DashboardCard
          title="Layanan Ibu Anak"
          description="Total layanan Ibu Anak Tercatat"
          value={parseInt(String(layananIbuAnakCount))}
          unit="Layanan"
        />
        <DashboardCard
          title="Layanan Lansia"
          description="Total layanan Lansia Tercatat"
          value={parseInt(String(layananLansiaCount))}
          unit="Layanan"
        />
      </div>

      {/* Charts */}
      <div className="flex mt-1 flex-col justify-center gap-1 md:justify-start">
        <div className="flex flex-col gap-1 md:flex-row">
          <ChartDemo3 />
          <ChartDemo2 />
        </div>
        <div className="flex flex-col gap-1 md:flex-row">
          <ChartDemo6 />
          <ChartDemo5 />
        </div>
      </div>
    </main>
  );
}
