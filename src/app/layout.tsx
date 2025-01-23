import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Posyandu Wonosobo",
  description:
    "Posyandu Wonosobo adalah website yang digunakan untuk mencatat data posyandu di Pekon Wonosobo",
  authors: {
    name: "Kelompok KKN PPM 26 Institut Teknologi Sumatera",
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
