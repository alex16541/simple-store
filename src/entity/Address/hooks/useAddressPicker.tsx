"use client";
import { useYMaps } from "@pbe/react-yandex-maps";
import {
  useState,
  useRef,
  SyntheticEvent,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { Address, Coordinates } from "../model/types/address";
import { DEFAULT_MAP_LOCATION } from "../consts/location";
import {
  selectGeoObjectAddress,
  prepareAddress,
  fetchSuggests,
} from "../lib/helpers";

const defaultAddress = {
  country: "",
  city: "",
  street: "",
  house: "",
  formatted: "",
};

interface UseAddressPickerOptions {
  onChangeAddress: (address: Address) => void;
  defaultQuery?: string;
}

export const useAddressPicker = (options: UseAddressPickerOptions) => {
  const { onChangeAddress, defaultQuery = "" } = options;

  const [_inited, _setInited] = useState(false);
  const [suggestOptions, setSuggestOptions] = useState<string[]>([]);
  const [address, _setAddress] = useState<Address>({
    ...defaultAddress,
    formatted: defaultQuery,
  });

  const ymaps = useYMaps(["Map", "geocode", "GeocodeResult", "Placemark"]);
  const mapRef = useRef<HTMLDivElement>();
  const map = useRef<ymaps.Map | null>(null);

  const setAddress = useCallback(
    (adr: DeepPartial<Address>) => {
      const newAddress = { ...address, ...adr };

      _setAddress(newAddress);

      onChangeAddress(newAddress);
    },
    [address, onChangeAddress],
  );

  const setMarkByCoords = useCallback(
    (coords: Coordinates, bounds?: Coordinates[]) => {
      if (!map.current || !ymaps) return null;

      map.current.geoObjects.removeAll();
      map.current.geoObjects.add(new ymaps.Placemark(coords, {}));

      if (bounds) map.current.setBounds(bounds);
    },
    [ymaps],
  );

  const geocode = useCallback(
    async (query: string | Coordinates) => {
      if (!ymaps) return null;
      try {
        const res = await ymaps.geocode(query, {
          kind: "house",
          results: 1,
        });

        return res;
      } catch (e) {
        // Todo: Add toast
        console.log(e);
        return null;
      }
    },
    [ymaps],
  );

  const onSelectAddress = async (_: SyntheticEvent, value: string | null) => {
    if (!value) {
      setAddress({
        house: "",
        city: "",
        street: "",
        country: "",
        formatted: "",
      });
      map.current?.geoObjects.removeAll();

      return null;
    }

    const res = await geocode(value);

    if (!res) return null;

    const geo = res.geoObjects.get(0);

    const address = selectGeoObjectAddress(geo);
    const prepared = prepareAddress(address);
    setAddress(prepared);

    if (!map.current) return null;

    const bounds = geo.properties.get("boundedBy", []) as Coordinates[];

    // @ts-expect-error В типе отсутствует метод, но в реальности он есть
    const coords = geo.geometry.getCoordinates();

    setMarkByCoords(coords, bounds);
  };

  const getSuggests = useDebouncedCallback(async (query: string) => {
    try {
      const { data } = await fetchSuggests(query);

      if (!data.results) return null;

      const options = data.results.map((i) => {
        const titleParts = [];

        if (i.subtitle) titleParts.push(i.subtitle.text);
        if (i.subtitle) titleParts.push(i.title.text);

        return titleParts.join(", ");
      });

      setSuggestOptions(options);
    } catch (e) {
      // todo: Add toast
      console.log(e);
    }
  }, 1000);

  const onChangeSuggestInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    getSuggests(value);
  };

  const onMapClick = useCallback(
    async (e: ymaps.IEvent<MouseEvent>) => {
      const coords = e.get("coords") as number[];

      setMarkByCoords(coords);

      const res = await geocode(coords);

      if (!res) return null;

      const geo = res.geoObjects.get(0);

      const address = selectGeoObjectAddress(geo);

      const prepared = prepareAddress(address);

      setAddress(prepared);
    },
    [geocode, setAddress, setMarkByCoords],
  );

  useEffect(() => {
    if (!mapRef.current || !ymaps) return;

    const newMap = new ymaps.Map(mapRef.current, DEFAULT_MAP_LOCATION, {
      copyrightUaVisible: false,
    });

    map.current = newMap;

    newMap.events.add("click", onMapClick);
  }, [ymaps, onMapClick]);

  useEffect(() => {
    if (!ymaps || !defaultQuery || _inited) return;

    async function setDefaultAddressOnMap(query: string | Coordinates) {
      const res = await geocode(query);

      if (!res) return null;

      const geo = res.geoObjects.get(0);

      const address = selectGeoObjectAddress(geo);
      const prepared = prepareAddress(address);
      setAddress(prepared);
      _setInited(true);

      if (!map.current) return null;

      const bounds = geo.properties.get("boundedBy", []) as Coordinates[];

      // @ts-expect-error В типе отсутствует метод, но в реальности он есть
      const coords = geo.geometry.getCoordinates();

      setMarkByCoords(coords, bounds);
    }

    setDefaultAddressOnMap(defaultQuery);
  }, [ymaps, defaultQuery]);

  return {
    map,
    mapRef,
    onChangeSuggestInput,
    suggestOptions,
    onSelectAddress,
    address,
    changeAddress: setAddress,
  };
};
