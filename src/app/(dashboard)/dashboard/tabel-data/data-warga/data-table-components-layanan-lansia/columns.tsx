"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Warga } from "./schema"; // Update schema import jika perlu

export const columns: ColumnDef<Warga>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-0.5"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "no",
    header: () => <p className="text-left">No</p>,
    cell: ({ row }) => <p className="text-left">{row.index + 1}</p>,
  },
  {
    accessorKey: "nama", // Ganti dengan nama warga dari data Layanan Lansia
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Warga" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("nama")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nik", // Umur warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="nik" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">{row.getValue("nik")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "tanggalLahir", // Umur warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="tanggal lahir" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">{row.getValue("tanggalLahir")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pencatatan" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  
  {
    // id: "actions",
    accessorKey: "id_layanan",
    header: () => <p className="text-right">Aksi</p>,
    cell: ({ row }) => (
      <DataTableRowActions id_layanan={row.getValue("id_layanan")} row={row} />
    ),
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // {
  //   accessorKey: "id_layanan",
  //   cell: ({ row }) => <p>{row.getValue("id_layanan")}</p>,
  //   // cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
