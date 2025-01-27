import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default async function Home() {

  const currentMonthName = getMonthNameInIndonesian(new Date().getMonth());

  return (
    <main className="container min-h-screen mx-auto">
      <Navbar />

      <section className="container mt-40 flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <Image
            src="/logo-posyandu.png"
            width={1000}
            height={1000}
            alt="Posyandu Wonosobo"
            className="h-32 w-36 rounded-md border"
          />

          <Image
            src="/logo-sgds.png"
            width={1000}
            height={1000}
            alt="Posyandu Wonosobo"
            className="h-32 w-36 rounded-md border"
          />
        </div>

        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          Posyandu Wonosobo
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Posyandu Wonosobo adalah website yang digunakan untuk mencatat data
          posyandu di Pekon Wonosobo
        </p>
      </section>

      <section className="flex flex-col items-center justify-start py-20">
        <h2 className="text-center text-2xl font-bold">
        </h2>

       
        {/* <div className="mx-auto mt-5 flex w-fit min-w-[300px] flex-col items-start px-4">
          <p className="font-bold">Keterangan</p>

          <div className="flex items-center gap-2 mt-2">
            <div className="bg-primary w-10 h-10 rounded-md" />

            <p className="text-[12px]">Kegiatan posyandu dilaksanakan</p>
          </div>
        </div> */}
      </section>

      

      <Footer />
    </main>
  );
}

const getMonthNameInIndonesian = (monthIndex: number): string => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[monthIndex];
};
