import { neon } from "@neondatabase/serverless";
import { getRequestContext } from "@cloudflare/next-on-pages";

let _db: ReturnType<typeof neon> | null = null;

function getDatabaseUrl(): string {
    try {
        const ctx = getRequestContext();
        const env = ctx?.env as Record<string, unknown> | undefined;
        if (env?.DATABASE_URL) {
            return env.DATABASE_URL as string;
        }
    } catch {
        // getRequestContext pode lançar se não estiver no contexto do Cloudflare
    }
    const url = process.env.DATABASE_URL;
    if (url) return url;
    return "";
}

export function getDb() {
    if (!_db) {
        _db = neon(getDatabaseUrl());
    }
    return _db;
}
