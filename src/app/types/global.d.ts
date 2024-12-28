type OptionalRecord<K extends keyof object, T> = {
  [P in K]?: T;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
