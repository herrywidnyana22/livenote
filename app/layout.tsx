import type { Metadata } from "next";
import "./globals.css";

import { ConvexClient } from "@/providers/convex-client";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
