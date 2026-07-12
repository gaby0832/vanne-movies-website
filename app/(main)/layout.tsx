import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search } from 'lucide-react';
import Image from "next/image";
import SearchBar from "./components/searchBar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'Vanne Filmes Oficial',
    description: 'Plataforma de doações para react de filmes',
    images: ['/logonav.png'],
  },
  title: "Vanne Filmes Oficial",
  description: "Plataforma de doações para react de filmes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      
      <body className="min-h-full flex flex-col bg-[#080808]" cz-shortcut-listen="true">
        <header className="z-40 fixed w-full h-16 bg-[#080808]">
          <nav className="text-white max-w-6xl h-full flex gap-3 my-0 mx-auto items-center justify-between items-center">

            <Link href="/">
                <Image
                width={90}
                height={0}
                src="/logonav.png"
                alt="Vanne Filmes"
                loading="eager"
              />
            </Link>
            
            <div className="hidden sm:flex gap-8 text-sm">
              <Link href="/">Terror</Link>
              <Link href="/">Suspense</Link>
              <Link href="/">Ação</Link>
              <Link href="/">Comédia</Link>
            </div>

            <SearchBar/>

            <button
                    type="button"
                    className="h-full px-3 sm:hidden flex  
                    justify-center items-center cursor-pointer"
                  >
                    <Search color="#4A4A4A" size={20} />
                  </button>

          </nav>
        </header>

        <div className="mt-16 min-h-full flex flex-col">
            {children}
        </div>
        </body>
    </html>
  );
}
