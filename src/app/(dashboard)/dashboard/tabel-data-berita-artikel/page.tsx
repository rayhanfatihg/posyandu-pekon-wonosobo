import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import InteractiveButton from "./InteractiveButton";
import React from "react";
import { getTablePost } from "./action";

export default async function BlogTablePage() {
  const data = await getTablePost();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Atur Postingan Blog & Artikel</h1>
      {data.length > 0 ? (
        <div className="rounded-md border">
          <ScrollArea className="max-w-[350px] overflow-hidden rounded-md border sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1280px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Gambar Utama</TableHead>
                  <TableHead>Dibuat pada</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>
                      <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Image
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <InteractiveButton
                        id={item.id}
                        isCurrentlyPublished={item.is_published}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada data tersedia.</p>
      )}
    </div>
  );
}
