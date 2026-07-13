"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");

  const { user, login, loading } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login(email, password, turnstileToken);

      router.replace("/dashboard/painel/home");
    } catch (err) {
      console.log(err);
    }
  }



    useEffect(() => {
      if (user) {
        router.replace("/dashboard/painel/home");
      }
    }, [loading, user, router]);
  

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 bg-cover bg-center" style={{backgroundImage: "url(https://res.cloudinary.com/dqx5v6hfi/image/upload/v1783950623/image_4_dvvx0s.png)"}}>
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Painel Administrativo
        </h1>

        <p className="mb-8 text-zinc-400">
          Entre para acessar o dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-sm border text-sm border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none transition focus:border-blue-500"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Senha
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-sm border text-sm border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none transition focus:border-blue-500"
              placeholder="********"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {process.env.NODE_ENV == "production" &&
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setTurnstileToken(token)}
          />
            }

          <button
            type="submit"
            //disabled={loading || !turnstileToken}
            className="px-4 rounded-lg bg-blue-600 py-3 font-medium text-white text-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}