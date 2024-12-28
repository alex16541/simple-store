export type FormState<T extends Record<string, string[]>> =
  | {
      payload?: FormData;
      errors?: T;
      message?: string;
    }
  | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WithPaginationResponse <T extends any[] = []>{
  data: T;
  totalItems: number;
}
