"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { LayananIbuHamil } from "./schema"; // Update schema import jika perlu

export const columns: ColumnDef<LayananIbuHamil>[] = [
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
    accessorKey: "namaWarga", // Ganti dengan nama warga dari data Layanan Lansia
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Warga" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("namaWarga")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "umur", // Umur warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Umur (Tahun)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">{row.getValue("umur")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "beratBadan", // Berat badan warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berat Badan (kg)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("beratBadan")}
      </div>
    ),
    filterFn: (row, id, value) => {
      const beratBadan = row.getValue(id) as number;
      return beratBadan >= value[0] && beratBadan <= value[1];
    },
  },
  {
    accessorKey: "tinggiBadan", // Tinggi badan warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tinggi Badan (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("tinggiBadan")}
      </div>
    ),
    filterFn: (row, id, value) => {
      const tinggiBadan = row.getValue(id) as number;
      return tinggiBadan >= value[0] && tinggiBadan <= value[1];
    },
  },
  
  {
    accessorKey: "lingkarLengan", // Lingkar perut warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lingkar Lengan (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("lingkarLengan")}
      </div>
    ),
  },
  {
    accessorKey: "tinggiPundus", // Tensi darah warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tinggi Pundus" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("tinggiPundus")}
      </div>
    ),
  },
  {
    accessorKey: "umurKehamilan", // Tensi darah warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Umur Kehamilan" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("umurKehamilan")}
      </div>
    ),
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
