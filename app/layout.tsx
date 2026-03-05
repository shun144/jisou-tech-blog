// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Tech Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <span className="font-mono text-sm font-semibold tracking-widest text-zinc-100 uppercase">
              My Tech Blog
            </span>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-600 tracking-wider">
              © 2026 My Tech Blog
            </span>
            <span className="font-mono text-xs text-zinc-700">
              built with Next.js
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
