import "./globals.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ConvexClient } from "@/providers/convex-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Livenote",
  description: "Real time note with share note and live editing note and scratch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClient>
          <Toaster/>
          {children}
        </ConvexClient>
      </body>
    </html>
  );
}
