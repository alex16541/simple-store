"use server";

import { sql } from "@/lib/server/db";
import { User } from "../model/types/user";

export const fetchUserById = async (userId: string | number) => {
  const users = await sql(`SELECT id, name, role FROM users WHERE id = ${userId}`) as User[]

  return users[0];
}
