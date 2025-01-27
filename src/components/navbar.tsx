import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import getUser from "@/utils/supabase/getUser";

export default async function Navbar() {
  const user = await getUser();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src="/logo-posyandu.png"
              width={1000}
              height={1000}
              alt="Posyandu Marga Agung"
              className="h-12 w-16"
            />

            <span className="sr-only">Posyandu Marga Agung</span>
          </Link>

          <nav className="hidden gap-4 md:flex">
            <Link
              href="/"
              className="flex items-center text-sm font-medium transition-colors duration-300 ease-in-out hover:text-primary"
              prefetch={false}
            >
              Posyandu Marga Agung
            </Link>

            
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                href={"/dashboard"}
                className={`${buttonVariants({ size: "sm" })} px-4`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={"/login"}
                className={`${buttonVariants({ size: "sm" })} px-4`}
              >
                Login Kader
              </Link>
            )}
          </div>
        </div>

        <div className="gap-4 flex mt-5 justify-center md:hidden items-center pb-5">
          <Link
            href="/"
            className="flex items-center text-sm font-medium transition-colors duration-300 ease-in-out hover:text-primary"
            prefetch={false}
          >
            Posyandu Marga Agung
          </Link>

          <Link
            href="/berita-artikel"
            className="flex items-center text-sm font-medium transition-colors duration-300 ease-in-out hover:text-primary"
            prefetch={false}
          >
            Berita & Artikel
          </Link>
        </div>
      </div>
    </nav>
  );
}
