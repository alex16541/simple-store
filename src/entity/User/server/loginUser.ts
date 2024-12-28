"use server";

import bcrypt from "bcrypt";
import { sql } from "@/lib/server/db";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/server/session";
import { UserRole } from "@/entity/User";
import { LoginFormSchema, LoginFormState } from "./formSchemas";

export const loginUser = async (_: LoginFormState, formData: FormData): Promise<LoginFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.issues[0].message,
      payload: formData,
    };
  }

  const { email, password } = validatedFields.data;

  const searchUserResult = (await sql(
    `SELECT id, role, password FROM users WHERE email = '${email}'`,
  )) as {id: string, role: UserRole, password: string}[];
  const user = searchUserResult[0];

  if (!user)
    return {
      message: "Пользователя с такой почтой не зарегистрирован",
      payload: formData,
    };

  const isPasswordCorrect = await bcrypt.compare(
    password,
    searchUserResult[0].password,
  );

  if (!isPasswordCorrect)
    return {
      message: "Не верный пароль",
      payload: formData,
    };

  await createSession(user.id, user.role);

  const redirectTo = formData.get("from")?.toString();

  redirect(redirectTo?.length ? redirectTo : "/");
};
