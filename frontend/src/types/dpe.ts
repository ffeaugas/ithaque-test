/**
 * Types pour les données DPE dans le frontend
 */

export type ClasseEnergetique = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "N";
export type ClasseGES = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "N";

export interface DPE {
  id: string;
  adresse: string;
  codePostal: string;
  commune: string;
  classeEnergetique: ClasseEnergetique;
  classeGES: ClasseGES;
  surfaceHabitable: number | null;
  anneeConstruction: number | null;
  latitude: number;
  longitude: number;
  dateDiagnostic: string | null;
}

export interface DPESearchResponse {
  results: DPE[];
  center: {
    lat: number;
    lon: number;
  };
  total: number;
}

export interface AddressSuggestion {
  label: string;
  lat: number;
  lon: number;
}
