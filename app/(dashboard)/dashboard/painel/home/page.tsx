"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

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
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
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

  async function handleLogout() {
    await logout();

    router.replace("/dashboard/login");
  }

  return (
    <main className="h-full bg-[#0A0A0A] text-white rounded-lg">


      <section className="mx-auto py-8 max-w-7xl px-8">
        <div className="p-8">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="h-24 w-24 rounded-full border-2 border-zinc-700 object-cover"
            />

            <div>
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-zinc-400">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-zinc-800 p-6">
              <p className="text-sm text-zinc-400">
                ID
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {user.id}
              </h3>
            </div>

            <div className="rounded-xl bg-zinc-800 p-6">
              <p className="text-sm text-zinc-400">
                Nome
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {user.name}
              </h3>
            </div>

            <div className="rounded-xl bg-zinc-800 p-6">
              <p className="text-sm text-zinc-400">
                Email
              </p>

              <h3 className="mt-2 text-xl font-semibold break-all">
                {user.email}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}