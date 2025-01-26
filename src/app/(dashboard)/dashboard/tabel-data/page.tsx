import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="h-full flex-1 flex-col space-y-2 md:flex md:items-start items-center justify-center md:justify-start">
      <div className="flex gap-2 flex-col md:flex-row">
        <Card className="aspect-square flex justify-center items-center flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              Tabel Data Layanan
              <br />
              Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src="/layanan-ibu-anak.png"
              width={300}
              height={200}
              alt="Layanan Ibu dan Anak"
            />
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/tabel-data/data-layanan-ibuanak"
              className={buttonVariants()}
            >
              Lihat Tabel Layanan
            </Link>
          </CardFooter>
        </Card>

        <Card className="aspect-square flex justify-center items-center flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              Tabel Data Layanan
              <br />
              Posbindu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src="/layanan-lansia.png"
              width={300}
              height={200}
              alt="Layanan Lansia"
            />
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/tabel-data/data-layanan-lansia"
              className={buttonVariants()}
            >
              Lihat Tabel Layanan
            </Link>
          </CardFooter>
        </Card>

        <Card className="aspect-square flex justify-center items-center flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              Tabel Data Layanan
              <br />
              Ibu Hamil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src="/ibu-hamil.png"
              width={300}
              height={200}
              alt="Layanan Lansia"
            />
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/tabel-data/data-layanan-ibu-hamil"
              className={buttonVariants()}
            >
              Lihat Tabel Layanan
            </Link>
          </CardFooter>
        </Card>

        <Card className="aspect-square flex justify-center items-center flex-col">
          <CardHeader>
            <CardTitle className="text-center">
              Tabel Data 
              <br />
              Warga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src="/warga.png"
              width={300}
              height={200}
              alt="Layanan Lansia"
            />
          </CardContent>
          <CardFooter>
            <Link
              href="/dashboard/tabel-data/data-warga"
              className={buttonVariants()}
            >
              Lihat Tabel Layanan
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
