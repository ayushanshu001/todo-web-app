"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <SessionProvider>
      <html lang="en">
        <body className=" text-white">
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
