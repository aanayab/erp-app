import { ICurrency } from "./ICurrency";
import { ILanguage } from "./Ilanguaje";

export interface ICountry {
    name?: string;
    code?: string;
    capital?: string;
    region?: string;
    currency?: ICurrency;
    language?: ILanguage;
    dialling_code?: string;
    isoCode?: string;
    demonym?: string;
  }