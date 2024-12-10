"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getStatusGiziAnak } from "./action";

export const description = "Grafik Donat dengan teks untuk Status Gizi Anak";

const chartConfig = {
  jumlah: {
    label: "Jumlah Anak",
  },
  "Gizi Baik": {
    label: "Gizi Baik",
    color: "hsl(var(--chart-1))",
  },
  "Kurang Gizi": {
    label: "Kurang Gizi",
    color: "hsl(var(--chart-2))",
  },
  "Gizi Buruk": {
    label: "Gizi Buruk",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartDemo2() {
  const [chartData, setChartData] = useState<
    { status: string; jumlah: number; fill: string }[]
  >([]);
  const [totalAnak, setTotalAnak] = useState<number>(0);
  const [tren, setTren] = useState<"meningkat" | "menurun" | "stabil">(
    "stabil"
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getStatusGiziAnak();
      if (response.success && response.data) {
        setChartData(response.data);

        // Hitung total anak dari data
        const total = response.data.reduce((acc, curr) => acc + curr.jumlah, 0);
        setTotalAnak(total);

        // Menentukan tren status gizi anak
        const giziBaik =
          response.data.find((item) => item.status === "Gizi Baik")?.jumlah ||
          0;
        const kurangGizi =
          response.data.find((item) => item.status === "Kurang Gizi")?.jumlah ||
          0;
        const giziBuruk =
          response.data.find((item) => item.status === "Gizi Buruk")?.jumlah ||
          0;

        if (giziBaik > kurangGizi && giziBaik > giziBuruk) {
          setTren("meningkat");
        } else if (giziBaik < kurangGizi || giziBaik < giziBuruk) {
          setTren("menurun");
        } else {
          setTren("stabil");
        }
      } else {
        console.error("Gagal memuat data status gizi:", response.error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Gizi Anak</CardTitle>
        <CardDescription>Data Terkini</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="jumlah"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAnak.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Anak
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {tren === "meningkat" ? (
            <>
              Tren status gizi menunjukkan peningkatan{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : tren === "menurun" ? (
            <>
              Tren status gizi menunjukkan penurunan{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          ) : (
            <>
              Tren status gizi stabil{" "}
              <TrendingUp className="h-4 w-4 text-yellow-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan distribusi status gizi anak berdasarkan data posyandu
          terbaru.
        </div>
      </CardFooter>
    </Card>
  );
}
