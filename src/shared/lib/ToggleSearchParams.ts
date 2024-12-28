export const toggleSearchParams = (
  object: Record<string, string | number | null>,
  urlSearchParams?: URLSearchParams,
) => {
  const params = new URLSearchParams(urlSearchParams);

  for (const [key, value] of Object.entries(object)) {
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
  }

  return params;
};
