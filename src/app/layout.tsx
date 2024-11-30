import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Posyandu Marga Agung",
  description:
    "Posyandu Marga Agung adalah website yang digunakan untuk mencatat data posyandu di Desa Marga Agung",
  authors: {
    name: "Tim KSI ITERA 2024 Posyandu Marga Agung",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full",
          geistSans.className
        )}
        suppressHydrationWarning={false}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
