"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LayananIbuAnak } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<LayananIbuAnak>[] = [
  {
    id: "selection",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "tinggiBadanIbu", // Height of the mother
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tinggi Badan Ibu (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("tinggiBadanIbu")}</span>
      </div>
    ),
  },
  {
    accessorKey: "beratBadanIbu", // Weight of the mother
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berat Badan Ibu (kg)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("beratBadanIbu")}</span>
      </div>
    ),
  },
  {
    accessorKey: "lingkarPinggangIbu", // Waist circumference of the mother
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lingkar Pinggang Ibu (cm)"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("lingkarPinggangIbu")}</span>
      </div>
    ),
  },
  {
    accessorKey: "alatKontrasepsi", // Contraception method
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alat Kontrasepsi" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        <span>{row.getValue("alatKontrasepsi")}</span>
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
