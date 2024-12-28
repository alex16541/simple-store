import { UserRole } from "@/entity/User";
import { cookies } from "next/headers";

export async function createSession(id: string, role: UserRole) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", JSON.stringify({ id, role }), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get("session");

  const user = JSON.parse(cookie?.value ?? "{}") as { id: string; role: UserRole };

  if(!user.id) return undefined;

  return user;
}

export async function removeSession() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}
