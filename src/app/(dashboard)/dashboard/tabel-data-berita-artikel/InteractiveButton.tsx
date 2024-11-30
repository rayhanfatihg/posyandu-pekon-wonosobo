"use client";

import React from "react";

import { toast } from "@/hooks/use-toast";

import { togglePostStatus } from "./action";

interface InteractiveButtonProps {
  id: string;
  isCurrentlyPublished: boolean;
}

export default function InteractiveButton({
  id,
  isCurrentlyPublished,
}: InteractiveButtonProps) {
  const handleToggle = async () => {
    try {
      const newStatus = !isCurrentlyPublished; // Toggle status
      const response = await togglePostStatus(id, newStatus);

      if (response.success) {
        toast({
          title: "Berhasil",
          description: `Post berhasil diubah menjadi ${
            response.is_published ? "Terposting" : "Tidak Terposting"
          }`,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal mengubah status posting.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`rounded px-4 py-2 text-sm font-medium ${
        isCurrentlyPublished
          ? "bg-green-800 text-white hover:bg-green-900"
          : "bg-gray-800 text-white hover:bg-gray-900"
      }`}
    >
      {isCurrentlyPublished ? "Terposting" : "Tidak Terposting"}
    </button>
  );
}
