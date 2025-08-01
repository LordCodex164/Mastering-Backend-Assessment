import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import Header from "@/components/ui/header";
import { Providers } from "./provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
