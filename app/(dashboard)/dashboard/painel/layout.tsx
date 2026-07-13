
import { Metadata } from "next";
import { useAuth } from "../../contexts/AuthContext";
import { redirect } from "next/navigation";
import NavUser from "../../components/NavUser";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'Painel Administrativo',
    description: 'Plataforma de doações para react de filmes',
    images: ['/logonav.png'],
  },
  title: "Dashboard - Login",
  description: "Plataforma de doações para react de filmes",
};


export default function PainelLayout({ children }: { children: React.ReactNode }) {
    

  return (

        <SidebarProvider>
    <div className="w-full h-full max-h-screen text-white flex">

              <header className="w-[300px] h-screen  max-h-screen">
        <div className="flex flex-col h-full max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <NavUser/>
        </div>
      </header>

    <div className="w-full max-h-screen ">
         {children}
    </div>

     </div>
     </SidebarProvider>
  );
}
