export type FormState<T extends Record<string, string[]>> =
  | {
      payload?: FormData;
      errors?: T;
      message?: string;
    }
  | undefined;
