import { cookies } from "next/headers";
import { db } from "./db";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = await verifyToken(token);

    const id = payload.id;

    const result = await db`
      SELECT *
      FROM users
      WHERE id = ${id}
    `;

    const user = result[0];

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
    }
  } catch {
    return null;
  }
}
