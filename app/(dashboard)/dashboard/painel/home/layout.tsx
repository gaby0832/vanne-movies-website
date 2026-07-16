
import { Metadata } from "next";
export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'Dashboard',
    description: 'Plataforma de doações para react de filmes',
    images: ['/logonav.png'],
  },
  title: "Dashboard",
  description: "Plataforma de doações para react de filmes",
};


export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    	{children}
    </>
  );
}
