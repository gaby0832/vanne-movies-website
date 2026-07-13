
import { Metadata } from "next";
import Providers from "./providers";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'Dashboard - Login',
    description: 'Plataforma de doações para react de filmes',
    images: ['/logonav.png'],
  },
  title: "Dashboard - Login",
  description: "Plataforma de doações para react de filmes",
};


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      
      <Providers>
          {children}
      </Providers>

    </div>
  );
}
