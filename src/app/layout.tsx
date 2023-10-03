"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import CollectionContextProvider from "@/contexts/collectionCtx";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hazie",
//   description: "make it yours",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CollectionContextProvider>{children}</CollectionContextProvider>
        </Providers>
      </body>
    </html>
  );
}
