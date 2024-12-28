"use server";

import { UserRole } from "@/entity/User";
import { sql } from "@/lib/server/db";
import { createSession } from "@/lib/server/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { SignpuFormState, SignupFormSchema } from "./formSchemas";

export const signupUser = async (_: SignpuFormState, formData: FormData): Promise<SignpuFormState> => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues[0].message,
      payload: formData,
    };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = (await sql(
    `insert into users (name, email, password) values ('${name}', '${email}', '${hashedPassword}') returning id, role`,
  )) as { id: string; role: UserRole }[];

  const user = res[0];

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  createSession(user.id, user.role);

  const redirectTo = formData.get("from")?.toString();

  redirect(redirectTo?.length ? redirectTo : "/");
};
