import {
  GeocodeAddress,
  FetchSuggestsResult,
  DetailedAddress,
} from "../model/types/address";

export const selectGeoObjectAddress = (geo: ymaps.IGeoObject) => {
  return geo.properties.get(
    "metaDataProperty.GeocoderMetaData.Address",
    {},
  ) as GeocodeAddress;
};

export const fetchSuggests = async (
  query: string,
): Promise<FetchSuggestsResult> => {
  const d = await fetch(`/api/suggest/address?query=${query}`);

  return await d.json();
};

export const prepareAddress = (address: GeocodeAddress) => {
  const [house, street, city] = address.formatted.split(", ").reverse();
  const { formatted } = address;

  return { house, street, city, formatted };
};

export const isDetailedAddressValid = (address?: DetailedAddress) => {
  if(!address) return false;

  const { address: a } = address;

  return !!a.formatted && !!a.street && !!a.city && !!a.house;
};
