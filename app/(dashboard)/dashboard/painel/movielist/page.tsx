"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { Clapperboard } from "lucide-react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/dashboard/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="z-1000 fixed top-0 left-0 flex w-screen h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500" />

          <p className="text-zinc-400">
            Verificando autenticação...
          </p>
        </div>
      </main>
    );
  }

  if (!user) return null;


  return (
    <main className="h-full bg-[#0A0A0A] text-white rounded-lg">


      <section className="mx-auto py-8 max-w-7xl px-8">
          <div>
          <h1 className="flex gap-2 align-center"><Clapperboard/>Lista de filmes</h1>
        </div>
  
      </section>
    </main>
  );
}