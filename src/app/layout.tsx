
import React from "react";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Finupsbd",
  description:
    "Brief info about FinUps BD and its mission to empower financial decisions in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interFont.variable}>
      <body className="antialiased">
        <Providers>
          <Toaster position="top-center" richColors />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
