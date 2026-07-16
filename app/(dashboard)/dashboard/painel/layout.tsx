
import { Metadata } from "next";
import NavUser from "../../components/NavUser";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { Clapperboard, LayoutDashboard, Logs, PictureInPicture2 } from "lucide-react";


export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'Painel Administrativo',
    description: 'Plataforma de doações para react de filmes',
    images: ['/logonav.png'],
  },
  title: "Dashboard - Painel",
  description: "Plataforma de doações para react de filmes",
};


export default function PainelLayout({ children }: { children: React.ReactNode }) {
    

  return (

        <SidebarProvider style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
    <div className="w-full h-full bg-[#171717] max-h-screen text-white flex gap-0">





              <header className="w-[300px] h-screen  max-h-screen">
        <div className="flex flex-col h-full max-w-7xl items-center justify-between py-4 border-0">
          


    <Sidebar collapsible="offcanvas" className="bg-hidden bg-transparent  bg-[#171717] py-4 border-0 justify-between items-between h-screen shadow-none" style={{border: "0px !important", boxShadow: "0 0 #0000 !important"}}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <h1 className="text-2xl font-bold">
                  <Image width={200} height={100} className="w-full h-auto" src="/painelLogo.png" alt="painel logo"/>
                </h1>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="h-full flex justify-between">


         <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarGroupLabel className="text-[#B6B6B6]">Home</SidebarGroupLabel>
        <SidebarMenu className="text-white">
          <SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/dashboard/painel/home" className="w-full h-full flex items-center gap-2"><LayoutDashboard />Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem><SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/dashboard/painel/liveoverlay" className="w-full h-full flex items-center gap-2"><PictureInPicture2/>Live Overlay</Link>
              </SidebarMenuButton>
            </SidebarMenuItem><SidebarMenuItem>
              <SidebarMenuButton>
                <Link href="/dashboard/painel/movielist" className="w-full h-full flex items-center gap-2"><Clapperboard/>Lista de filmes</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>




        <SidebarFooter className="justify-self-end">
          <NavUser/>
      </SidebarFooter>
      </SidebarContent>
    </Sidebar>

        </div>
      </header>

    <div className="w-full px-3 py-3">
         {children}
    </div>

     </div>
     </SidebarProvider>
  );
}
