"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { LayananAnak } from "./schema";

export const columns: ColumnDef<LayananAnak>[] = [
  // {
  //   id: "selection",
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
    accessorKey: "namaAnak",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Anak" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("namaAnak")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "namaIbu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Ibu" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("namaIbu")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "namaAyah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Ayah" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("namaAyah")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "tinggiBadanAnak", // Height of the child
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tinggi Badan Anak (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("tinggiBadanAnak")}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      const tinggiBadanAnak = row.getValue(id) as number;
      return tinggiBadanAnak >= value[0] && tinggiBadanAnak <= value[1];
    },
  },
  {
    accessorKey: "beratBadanAnak", // Weight of the child
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berat Badan Anak (kg)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("beratBadanAnak")}</span>
      </div>
    ),
    filterFn: (row, id, value) => {
      const beratBadanAnak = row.getValue(id) as number;
      return beratBadanAnak >= value[0] && beratBadanAnak <= value[1];
    },
  },
  {
    accessorKey: "umurAnak", // Age of the child
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Umur Anak (Tahun)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("umurAnak")}</span>
      </div>
    ),
  },
  {
    accessorKey: "lingkarLenganAnak", // Upper arm circumference of the child
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lingkar Lengan Anak (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("lingkarLenganAnak")}</span>
      </div>
    ),
  },
  {
    accessorKey: "lingkarKepalaAnak", // Head circumference of the child
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lingkar Kepala Anak (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("lingkarKepalaAnak")}</span>
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  //   // cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
  {
    // id: "actions",
    accessorKey: "id_layanan",
    header: () => <p className="text-right">Aksi</p>,
    cell: ({ row }) => (
      <DataTableRowActions id_layanan={row.getValue("id_layanan")} row={row} />
    ),
    enableHiding: false,
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
