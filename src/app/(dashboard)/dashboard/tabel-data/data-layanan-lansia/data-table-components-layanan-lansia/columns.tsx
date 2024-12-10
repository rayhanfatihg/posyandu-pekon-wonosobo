"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LayananLansia } from "./schema"; // Update schema import jika perlu
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<LayananLansia>[] = [
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
    accessorKey: "asamUrat", // Asam urat warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asam Urat (mg/dL)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("asamUrat")}
      </div>
    ),
  },
  {
    accessorKey: "gulaDarah", // Gula darah warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gula Darah (mg/dL)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("gulaDarah")}
      </div>
    ),
  },
  {
    accessorKey: "kolesterol", // Kolesterol warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kolesterol (mg/dL)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("kolesterol")}
      </div>
    ),
  },
  {
    accessorKey: "lingkarPerut", // Lingkar perut warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lingkar Perut (cm)" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("lingkarPerut")}
      </div>
    ),
  },
  {
    accessorKey: "tensiDarah", // Tensi darah warga
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tensi Darah" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[100px] items-center">
        {row.getValue("tensiDarah")}
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
    accessorKey: "keterangan", // Keterangan tambahan
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => (
      <div className="flex w-[200px] items-center">
        {row.getValue("keterangan")}
      </div>
    ),
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
