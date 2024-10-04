export type TBorderCountry = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
};

type TAvailableCountry = {
  countryCode: string;
  name: string;
};

export type TAvailableCountries = TAvailableCountry[];

export type TPopulationData = { year: number; value: number }[];

export type TBorders = { borders: TBorderCountry[] };

type TFlag = { flag: string };

export type TCountryInfo = {
  countryName: string;
  population: TPopulationData;
} & TBorders &
  TFlag;
