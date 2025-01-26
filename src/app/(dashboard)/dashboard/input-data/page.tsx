"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LayananAnak from "./layanan-anak/LayananAnak";
import LayananIbuHamil from "./layanan-ibu-hamil/layananIbuHamil";
import LayananPosbinduForm from "./layanan-posbindu/LayananPosbindu";
import { getAllDataWarga } from"./layanan-posbindu/action";

function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-3/4 rounded bg-gray-300"></div>
      <div className="h-4 w-5/6 rounded bg-gray-300"></div>
      <div className="h-4 w-1/2 rounded bg-gray-300"></div>
    </div>
  );
}

export default function InputDataPage() {
  const [selectedTab, setSelectedTab] = useState("anak");
  const [loading, setLoading] = useState(true);

  const [wargaOptions, setWargaOptions] = React.useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const storedTab = localStorage.getItem("selectedTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }

// sourcery skip: avoid-function-declarations-in-blocks
    async function fetchData() {
      try {
        const result = await getAllDataWarga();
        if (result.success && result.data) {
          setWargaOptions(
            result.data.map((warga: { id: string; nama: string }) => ({
              value: warga.id,
              label: warga.nama,
            }))
          );
        } else {
          console.error(result.error || "Data is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Now sets loading to false only after the data fetching is done
      }
    }

    setLoading(true); // Initially set loading to true when starting the fetch

    fetchData();
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    localStorage.setItem("selectedTab", value);
  };

  return (
    <main className="min-h-screen w-full">
      <h1 className="text-2xl font-bold">Masukan Data Layanan Posyandu</h1>

      <div className="mb-6 mt-10 mx-auto w-full flex justify-center flex-col items-center md:justify-start md:items-start">
        <h1 className="text-lg font-semibold">Pilih Jenis Layanan</h1>

        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="mt-4"
        >
          <TabsList className="flex w-[310px] sm:w-[400px]">
            <TabsTrigger value="anak" className="w-full">
              Layanan Anak
            </TabsTrigger>
            <TabsTrigger value="posbindu" className="w-full">
              Layanan Posbindu
            </TabsTrigger>
            <TabsTrigger value="ibuhamil" className="w-full">
              Layanan Ibu Hamil
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="anak">
  <LayananAnak data={wargaOptions} />
</TabsContent>
<TabsContent value="posbindu">
  <LayananPosbinduForm data={wargaOptions} />
</TabsContent>
<TabsContent value="ibuhamil">
  <LayananIbuHamil data={wargaOptions} />
</TabsContent>
          
        </Tabs>
      </div>
    </main>
  );
}
