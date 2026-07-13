import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import SearchBar from "./components/searchBar";

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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="z-40 fixed w-full h-16 bg-[#080808]">
        <nav className="text-white max-w-6xl h-full flex gap-3 my-0 mx-auto items-center justify-between">
          <Link href="/">
            <Image width={90} height={0} src="/logonav.png" alt="Vanne Filmes" loading="eager" />
          </Link>
          <div className="hidden sm:flex gap-8 text-sm">
            <Link href="/">Terror</Link>
            <Link href="/">Suspense</Link>
            <Link href="/">Ação</Link>
            <Link href="/">Comédia</Link>
          </div>
          <SearchBar />
          <button type="button" className="h-full px-3 sm:hidden flex justify-center items-center">
            <Search color="#4A4A4A" size={20} />
          </button>
        </nav>
      </header>
      <main className="mt-16 min-h-full flex flex-col">{children}</main>
    </>
  );
}
