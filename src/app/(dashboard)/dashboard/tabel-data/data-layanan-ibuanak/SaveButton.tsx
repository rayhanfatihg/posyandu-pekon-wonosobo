"use client";

import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect } from "react";

import * as XLSX from "xlsx"; // Import XLSX for handling Excel export
import { saveAs } from "file-saver";
import { FileDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function exportToExcel(data: any[]) {
  const filteredData = data.map(({ id_layanan, ...rest }) => rest);

  // Convert filtered data to worksheet
  const ws = XLSX.utils.json_to_sheet(filteredData);

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
  const supabase = createClient();
  const [email, setEmail] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const getEmail = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      setEmail(data.user.email!);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getEmail();
  }, [getEmail]);

  if (email !== process.env.NEXT_PUBLIC_EMAIL_ADMIN) return null;

  return (
    <>
      {/* {email === process.env.NEXT_PUBLIC_EMAIL_ADMIN ? (
        <Button
          onClick={() => exportToExcel(data)}
          className="h-8 text-[12px] flex items-center justify-center gap-2"
        >
          <FileDown className="mb-[2px]" />
          Download Excel
        </Button>
      ) : null} */}
      <Button
        onClick={() => exportToExcel(data)}
        className="h-8 text-[12px] flex items-center justify-center gap-2"
      >
        <FileDown className="mb-[2px]" />
        Download Excel
      </Button>
    </>
  );
}

export default SaveButton;
