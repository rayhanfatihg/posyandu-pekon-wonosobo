import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CardBeritaArtikel from "@/components/(guest)/berita-artikel/CardBeritaArtikel";
import Footer from "@/components/footer";
import JadwalKegiatanBulanIni from "@/components/(guest)/jadwal-kegiatan/jadwal-kegiatan";
import Navbar from "@/components/navbar";
import { readBlog } from "@/components/(guest)/berita-artikel/dashboard/action";

export default async function Home() {
  const articles = await readBlog();

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
            alt="Posyandu Marga Agung"
            className="h-32 w-36 rounded-md border"
          />

          <Image
            src="/logo-sgds.png"
            width={1000}
            height={1000}
            alt="Posyandu Marga Agung"
            className="h-32 w-36 rounded-md border"
          />
        </div>

        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          Posyandu Wonosobo
        </h1>

        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Posyandu Marga Agung adalah website yang digunakan untuk mencatat data
          posyandu di Pekon Wonosobo
        </p>
      </section>

      <section className="flex flex-col items-center justify-start py-20">
        <h2 className="text-center text-2xl font-bold">
          Jadwal Posyandu Bulan {currentMonthName}
        </h2>

        <div className="mt-5 w-fit">
          {/* <CalendarDemo /> */}

          <JadwalKegiatanBulanIni />
        </div>

        {/* <div className="mx-auto mt-5 flex w-fit min-w-[300px] flex-col items-start px-4">
          <p className="font-bold">Keterangan</p>

          <div className="flex items-center gap-2 mt-2">
            <div className="bg-primary w-10 h-10 rounded-md" />

            <p className="text-[12px]">Kegiatan posyandu dilaksanakan</p>
          </div>
        </div> */}
      </section>

      <section className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold">List Berita & Artikel</h2>

        <div className="mt-5 flex w-fit flex-wrap justify-center gap-2">
          {articles
            .slice(0, 3)
            .map(({ id, title, image_url, blog_content }) => (
              <Link key={id} href={`/berita-artikel/${id}`}>
                <CardBeritaArtikel
                  img={image_url}
                  title={title}
                  desc={blog_content[0]?.content.slice(0, 100) || ""}
                />
              </Link>
            ))}
        </div>

        <Link href="/berita-artikel" className="mt-10 flex w-fit">
          <Button type="submit" size="sm" className="w-full">
            Lihat Semua Berita & Artikel
          </Button>
        </Link>
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
