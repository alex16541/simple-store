export type Coordinates = number[];

export interface Address {
  country: string;
  city: string;
  street: string;
  house: string;
  formatted: string;
}

export interface AddressDetails {
  apartment?: string;
  floor?: string;
  intercom?: string;
  entrance?: string;
  comment?: string;
}

export interface DetailedAddress {
  address: Address;
  details: AddressDetails; 
}

export interface GeocodeAddress {
  formatted: string;
  country_code: string;
  Components: { kind: string; name: string }[];
}
export interface SuggestResult {
  title: {
    text: string;
    hl?: {
      begin: number;
      end: number;
    }[];
  };
  subtitle: {
    text: string;
    hl?: {
      begin: number;
      end: number;
    }[];
  };
  tags: string[];
  distance: {
    value: number;
    text: string;
  };
  uri: string;
}
export interface FetchSuggestsResult {
  error?: string;
  data: {
    results?: SuggestResult[];
  };
}
