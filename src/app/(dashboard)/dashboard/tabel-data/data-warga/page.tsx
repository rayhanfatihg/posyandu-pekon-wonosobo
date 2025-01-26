import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { DataTable } from "./data-table-components-layanan-lansia/data-table";
import { columns } from "./data-table-components-layanan-lansia/columns";
import { getDataWarga } from "./action";

function BreadcrumbTabelData() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/tabel-data">
            Tabel-Data
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Data Warga</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default async function Page() {
  const data = await getDataWarga();

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">Data Warga</h1>

      <BreadcrumbTabelData />

      <div className="mt-10">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
