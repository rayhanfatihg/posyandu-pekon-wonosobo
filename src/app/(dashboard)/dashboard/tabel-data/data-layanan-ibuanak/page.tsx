import { DataTable } from "./data-table-components-layanan-ibu-anak/data-table";
import { columns } from "./data-table-components-layanan-ibu-anak/columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getDataLayananIbuAnak } from "./action";

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
          <BreadcrumbPage>Layanan Ibu dan Anak</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default async function Page() {
  const data = await getDataLayananIbuAnak();

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">Data Layanan Ibu dan Anak</h1>

      <BreadcrumbTabelData />

      <div className="mt-10">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
