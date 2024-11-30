import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
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
              Ibu dan Anak
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
              Lansia
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
      </div>
    </div>
  );
}
