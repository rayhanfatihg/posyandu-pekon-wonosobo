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
import { getRataRataPemeriksaanAnak } from "./action";

const chartConfig = {
  rataRataBerat: {
    label: "Rata-Rata Berat Badan",
    color: "hsl(var(--chart-1))",
  },
  rataRataTinggi: {
    label: "Rata-Rata Tinggi Badan",
    color: "hsl(var(--chart-2))",
  },
  rataRataLingkarLengan: {
    label: "Rata-Rata Lingkar Lengan",
    color: "hsl(var(--chart-3))",
  },
  rataRataLingkarKepala: {
    label: "Rata-Rata Lingkar Kepala",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartDemo6() {
  const [chartData, setChartData] = useState<
    {
      bulan: string;
      rataRataBerat: number;
      rataRataTinggi: number;
      rataRataLingkarLengan: number;
      rataRataLingkarKepala: number;
    }[]
  >([]);
  const [tren, setTren] = useState<"meningkat" | "menurun" | "stabil">(
    "stabil"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRataRataPemeriksaanAnak();
        if (response.success && response.data) {
          // Filter data jika semua nilai rata-rata = 0
          const filteredData = response.data.filter((item) => {
            return (
              item.rataRataBerat > 0 ||
              item.rataRataTinggi > 0 ||
              item.rataRataLingkarLengan > 0 ||
              item.rataRataLingkarKepala > 0
            );
          });

          setChartData(filteredData);

          // Hitung tren berdasarkan dua bulan terakhir
          if (filteredData.length >= 2) {
            const lastMonth = filteredData[filteredData.length - 1];
            const previousMonth = filteredData[filteredData.length - 2];

            const totalLastMonth =
              lastMonth.rataRataBerat +
              lastMonth.rataRataTinggi +
              lastMonth.rataRataLingkarLengan +
              lastMonth.rataRataLingkarKepala;

            const totalPreviousMonth =
              previousMonth.rataRataBerat +
              previousMonth.rataRataTinggi +
              previousMonth.rataRataLingkarLengan +
              previousMonth.rataRataLingkarKepala;

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
          setChartData([]); // Jika gagal, set ke array kosong
        }
      } catch (error) {
        console.error("Error saat fetching data chart:", error);
        setChartData([]);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Rata-Rata Pemeriksaan Kesehatan Anak</CardTitle>
        <CardDescription>Periode Januari - Desember</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="rataRataBerat"
              fill="hsl(var(--chart-1))"
              radius={8}
            />
            <Bar
              dataKey="rataRataTinggi"
              fill="hsl(var(--chart-2))"
              radius={8}
            />
            <Bar
              dataKey="rataRataLingkarLengan"
              fill="hsl(var(--chart-3))"
              radius={8}
            />
            <Bar
              dataKey="rataRataLingkarKepala"
              fill="hsl(var(--chart-4))"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {tren === "meningkat" && (
            <>
              Tren pemeriksaan meningkat bulan ini{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          )}
          {tren === "menurun" && (
            <>
              Tren pemeriksaan menurun bulan ini{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
          {tren === "stabil" && (
            <>
              Tren pemeriksaan stabil{" "}
              <Minus className="h-4 w-4 text-yellow-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan rata-rata pemeriksaan kesehatan anak per bulan.
        </div>
      </CardFooter>
    </Card>
  );
}
