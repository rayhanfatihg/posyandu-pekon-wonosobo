"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import * as XLSX from "xlsx"; // Import XLSX for handling Excel export
import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";

function exportToExcel(data: any[]) {
  // Convert JSON data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Layanan Ibu dan Anak");

  // Generate the Excel file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob and trigger a download
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "data_layanan_ibu_anak.xlsx");
}

function SaveButton({ data }: { data: any[] }) {
  return (
    <Button
      onClick={() => exportToExcel(data)}
      className="h-8 text-[12px] flex items-center justify-center gap-2"
    >
      <FileDown className="mb-[2px]" />
      Download Excel
    </Button>
  );
}

export default SaveButton;
