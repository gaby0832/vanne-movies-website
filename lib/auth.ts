import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);

    const id = payload.id;

    const result = await db.query(
      "SELECT id, name, email, avatar_url FROM users WHERE id = $1",
      [id]
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
