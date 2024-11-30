// Import necessary components
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { readBlogDeatailById } from "@/components/(guest)/berita-artikel/dashboard/action";
import MarkdownPreview from "@/components/(guest)/berita-artikel/dashboard/MarkdownPreview";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ "berita-artikel-id": string }>;
}) {
  // Destructure article ID from params
  const artikelId = (await params)["berita-artikel-id"];

  // Fetch article details asynchronously
  const artikel = await readBlogDeatailById(artikelId);

  // If article not found, trigger the notFound page
  if (!artikel) {
    return notFound();
  }

  return (
    <main className="container">
      <Navbar />

      <section className="container mt-40 flex max-w-[64rem] flex-col items-center gap-4 text-center">
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

        <h1 className="text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          {artikel.title}
        </h1>

        <p className="max-w-[42rem] text-sm font-normal leading-normal text-muted-foreground">
          {artikel.blog_content[0]?.content.slice(0, 150) || ""}
        </p>
      </section>

      <section className="mx-auto mt-10 flex w-full flex-col">
        <Image
          src={artikel.image_url}
          alt={artikel.title}
          width={600}
          height={400}
          className="mx-auto rounded-md"
        />

        <div className="mx-auto max-w-5xl py-20">
          <MarkdownPreview content={artikel.blog_content[0]?.content} />
        </div>
      </section>

      <div className="mx-auto flex items-center justify-center pb-10">
        <Link
          href={"/berita-artikel"}
          className={buttonVariants({ size: "sm" })}
        >
          Kembali ke halaman berita
        </Link>
      </div>
      <Footer />
    </main>
  );
}
