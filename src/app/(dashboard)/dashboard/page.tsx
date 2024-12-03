import { redirect } from "next/navigation";

import { ChartDemo1 } from "@/components/(dashboard)/charts/chart1";
import { ChartDemo2 } from "@/components/(dashboard)/charts/chart2";
import { ChartDemo3 } from "@/components/(dashboard)/charts/chart3";
import { ChartDemo4 } from "@/components/(dashboard)/charts/chart4";
import { ChartDemo5 } from "@/components/(dashboard)/charts/chart5";
import { ChartDemo6 } from "@/components/(dashboard)/charts/chart6";
import getUser from "@/utils/supabase/getUser";
import {
  getJadwalPosyandu,
  getLayananIbuAnakStats,
  getLayananLansiaStats,
  getWargaStats,
} from "./action";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const wargaStats = await getWargaStats();
  const layananIbuAnakStats = await getLayananIbuAnakStats();
  const layananLansiaStats = await getLayananLansiaStats();
  const jadwalPosyandu = await getJadwalPosyandu();

  return (
    <main className="flex min-h-screen w-full flex-col justify-start">
      <h1 className="text-2xl font-bold">Dashboard Monitoring</h1>

      <div className="mt-10">
        <h2 className="font-bold">Report Data Posyandu</h2>
      </div>

      <div className="flex gap-1 mt-5">
        <Card className="p-4 w-fit">
          <CardTitle>
            <h3 className="font-bold">Jumlah Data Warga</h3>
          </CardTitle>

          <CardDescription className="mt-2">
            <p>Jumlah total warga yang tercatat</p>
          </CardDescription>

          <CardContent className="p-0 mt-4">
            <p className="text-5xl font-bold text-primary">
              {wargaStats.totalWarga}{" "}
              <span className="text-sm text-card-foreground opacity-45">
                Penduduk
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 w-fit">
          <CardTitle>
            <h3 className="font-bold">Rata-Rata Umur</h3>
          </CardTitle>

          <CardDescription className="mt-2">
            <p>Rata-rata umur dari seluruh warga</p>
          </CardDescription>

          <CardContent className="p-0 mt-4">
            <p className="text-5xl font-bold text-primary">
              {parseInt(String(wargaStats.rataRataUmur))}{" "}
              <span className="text-sm text-card-foreground opacity-45">
                Tahun
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex mt-1 flex-col justify-center gap-1 md:justify-start">
        <div className="flex flex-col gap-1 md:flex-row">
          <ChartDemo3 />
          <ChartDemo5 />
          <ChartDemo6 />
        </div>

        <div className="flex flex-col gap-1 md:flex-row">
          <ChartDemo1 />
          <ChartDemo2 />
        </div>
      </div>

      <div className="mt-2 w-full">
        <ChartDemo4 />
      </div>
    </main>
  );
}
