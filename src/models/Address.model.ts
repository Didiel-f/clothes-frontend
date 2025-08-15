
export default interface Address {
  regionName: string;
  countyName: string;
  countyCode: string;
  streetName: string;
  streetNumber: string;
  houseApartment: string;
}
export interface IRegion {
  regionId: string;
  regionName: string;
}
export interface ICounty {
  countyCode: string;
  countyName: string;
  regionCode: string;
  ineCountyCode: number;
  queryMode: number;
  coverageName: string;
  ind_ppd: number;
  ind_rd: number;
}

export type IStreet = {
  streetId: number
  streetName: string
  [key: string]: any
}

export interface ICounty {
  countyCode: string;
  countyName: string;
  regionCode: string;
  ineCountyCode: number;
  queryMode: number;
  coverageName: string;
  ind_ppd: number;
  ind_rd: number;
}
