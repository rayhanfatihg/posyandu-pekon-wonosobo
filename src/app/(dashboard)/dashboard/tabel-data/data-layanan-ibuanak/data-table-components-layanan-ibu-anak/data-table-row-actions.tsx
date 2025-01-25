"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import EditLayanan from "./edit-layanan";
import { Ellipsis } from "lucide-react";
import { deleteLayananAnak } from "./action";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface DataTableRowActionsProps {
  id_layanan: string;
  row: any;
}

export function DataTableRowActions({
  id_layanan,
  row,
}: DataTableRowActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State untuk membuka/menutup dialog
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteLayananAnak(id_layanan);

      if (result.success) {
        toast({
          title: "Layanan berhasil dihapus.",
          description: "Data layanan Ibu Anak berhasil dihapus.",
        });
        window.location.reload();
      } else {
        throw new Error("Gagal menghapus Data layanan Ibu Anak");
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan!",
        description: "Gagal menghapus data.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => setIsDialogEditOpen(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)} // Membuka dialog konfirmasi
            className="cursor-pointer text-red-600 hover:bg-red-50"
          >
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog konfirmasi */}
      <ConfirmDeleteDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteClick}
        isDeleting={isDeleting}
      />

      <EditLayanan
        open={isDialogEditOpen}
        onClose={() => setIsDialogEditOpen(false)}
        onConfirm={() => setIsDialogEditOpen(false)}
        isEditing={isEditing}
        row_edit={row}
      />
    </>
  );
}
