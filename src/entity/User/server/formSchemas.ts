import { FormState } from "@/shared/types";
import { z } from "zod";

export type LoginFormState = FormState<{
  email?: string[];
  password?: string[];
}>;

export type SignpuFormState = FormState<{
  name?: string[];
  email?: string[];
  password?: string[];
  confirm?: string[];
}>;

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Не коректный формат электронной почты" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не меньше 8 символов в длинну" })
    .regex(/[a-zA-Z]/, {
      message: "Пароль делже содержать хотябы одну заглавную букву",
    })
    .regex(/[0-9]/, { message: "Пароль делже содержать хотябы одну цифру" })
    .trim(),
});

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Имя должно быть не меньше 2 сиволов в длинну" })
      .trim(),
    email: z
      .string()
      .email({ message: "Не коректный формат электронной почты" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Пароль должен быть не меньше 8 символов в длинну" })
      .regex(/[a-zA-Z]/, {
        message: "Пароль делже содержать хотябы одну заглавную букву",
      })
      .regex(/[0-9]/, { message: "Пароль делже содержать хотябы одну цифру" })
      .trim(),
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совмадают",
    path: ["confirm"],
  });
