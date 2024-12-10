"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import { getRataRataLayananLansiaPerBulan } from "./action";

// Konfigurasi warna untuk tiap data
const chartConfig = {
  rataRataGds: { label: "Rata-Rata GDS", color: "hsl(var(--chart-1))" },
  rataRataTensi: {
    label: "Rata-Rata Tekanan Darah",
    color: "hsl(var(--chart-2))",
  },
  rataRataBerat: {
    label: "Rata-Rata Berat Badan",
    color: "hsl(var(--chart-3))",
  },
  rataRataTinggi: {
    label: "Rata-Rata Tinggi Badan",
    color: "hsl(var(--chart-4))",
  },
  rataRataKolesterol: {
    label: "Rata-Rata Kolesterol",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartDemo5() {
  const [chartData, setChartData] = useState<
    {
      bulan: string;
      rataRataGds: number;
      rataRataTensi: number;
      rataRataBerat: number;
      rataRataTinggi: number;
      rataRataKolesterol: number;
    }[]
  >([]);
  const [tren, setTren] = useState<"meningkat" | "menurun" | "stabil">(
    "stabil"
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getRataRataLayananLansiaPerBulan();
      if (response.success) {
        // Filter untuk hanya menampilkan data jika minimal satu nilai > 0
        const filteredData = response.data.filter((item) => {
          return (
            item.rataRataGds > 0 ||
            item.rataRataTensi > 0 ||
            item.rataRataBerat > 0 ||
            item.rataRataTinggi > 0 ||
            item.rataRataKolesterol > 0
          );
        });

        setChartData(filteredData);

        // Hitung tren rata-rata dari dua bulan terakhir
        if (filteredData.length >= 2) {
          const lastMonth = filteredData[filteredData.length - 1];
          const previousMonth = filteredData[filteredData.length - 2];

          const totalLastMonth =
            lastMonth.rataRataGds +
            lastMonth.rataRataTensi +
            lastMonth.rataRataBerat +
            lastMonth.rataRataTinggi +
            lastMonth.rataRataKolesterol;

          const totalPreviousMonth =
            previousMonth.rataRataGds +
            previousMonth.rataRataTensi +
            previousMonth.rataRataBerat +
            previousMonth.rataRataTinggi +
            previousMonth.rataRataKolesterol;

          if (totalLastMonth > totalPreviousMonth) {
            setTren("meningkat");
          } else if (totalLastMonth < totalPreviousMonth) {
            setTren("menurun");
          } else {
            setTren("stabil");
          }
        }
      } else {
        console.error("Gagal memuat data chart:", response.error);
      }
    }
    fetchData();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Rata-Rata Pemeriksaan Lansia</CardTitle>
        <CardDescription>Periode Januari - Desember</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 30 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            {/* Rata-rata GDS */}
            <Bar dataKey="rataRataGds" fill="hsl(var(--chart-1))" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            {/* Rata-rata Tekanan Darah */}
            <Bar dataKey="rataRataTensi" fill="hsl(var(--chart-2))" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            {/* Rata-rata Berat Badan */}
            <Bar dataKey="rataRataBerat" fill="hsl(var(--chart-3))" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            {/* Rata-rata Tinggi Badan */}
            <Bar dataKey="rataRataTinggi" fill="hsl(var(--chart-4))" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            {/* Rata-rata Kolesterol */}
            <Bar
              dataKey="rataRataKolesterol"
              fill="hsl(var(--chart-5))"
              radius={8}
            >
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {tren === "meningkat" && (
            <>
              Tren rata-rata meningkat bulan ini{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          )}
          {tren === "menurun" && (
            <>
              Tren rata-rata menurun bulan ini{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
          {tren === "stabil" && (
            <>
              Tren rata-rata stabil{" "}
              <Minus className="h-4 w-4 text-yellow-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan rata-rata berbagai pemeriksaan lansia per bulan.
        </div>
      </CardFooter>
    </Card>
  );
}
