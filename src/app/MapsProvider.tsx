'use client';

import { YMaps } from "@pbe/react-yandex-maps";

const API_KEY = "bf2e5f61-f831-48b5-be43-31bc408e52be";

export const MapsProvider = ({ children }: { children: React.ReactNode }) => {
  return <YMaps query={{
    lang: 'ru_RU',
    apikey: API_KEY,
  }}>{children}</YMaps>;
};
