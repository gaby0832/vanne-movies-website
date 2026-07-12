import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "./db";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: number };

    const result = await db.query(
      "SELECT id, name, email, avatar_url FROM users WHERE id = $1",
      [payload.id]
    );


    return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        avatar_url: result.rows[0].avatar_url,
    }
  } catch {
    return null;
  }
}

export const runtime = "nodejs";