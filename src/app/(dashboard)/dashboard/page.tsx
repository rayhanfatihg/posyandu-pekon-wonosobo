import { redirect } from "next/navigation";

import { ChartDemo1 } from "@/components/(dashboard)/charts/chart1";
import { ChartDemo2 } from "@/components/(dashboard)/charts/chart2";
import { ChartDemo3 } from "@/components/(dashboard)/charts/chart3";
import { ChartDemo4 } from "@/components/(dashboard)/charts/chart4";
import { ChartDemo5 } from "@/components/(dashboard)/charts/chart5";
import { ChartDemo6 } from "@/components/(dashboard)/charts/chart6";
import getUser from "@/utils/supabase/getUser";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen w-full flex-col justify-start">
      <h1 className="text-2xl font-bold">Dashboard Monitoring</h1>

      <div className="mt-10">
        <h2 className="font-bold">Report Data Posyandu</h2>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-1 md:justify-start">
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
