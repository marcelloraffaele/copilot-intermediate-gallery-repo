import type { Metadata } from "next";
import Link from "next/link";
import { Camera } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo Gallery & Portfolio",
  description: "A curated collection of photographs and creative works showcasing a personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {/* Navigation Header */}
        <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Camera className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Portfolio Gallery
                </h1>
              </Link>
              <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <Link href="/gallery" className="nav-link">
                  Gallery
                </Link>
                <Link href="/upload" className="nav-link">
                  Upload
                </Link>
                <Link href="/support" className="nav-link">
                  Richiedi Supporto
                </Link>
                <Link href="/admin" className="btn-primary">
                  Admin
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
        {/* REPLACE THIS COMMENT */}
      </body>
    </html>
  );
}
