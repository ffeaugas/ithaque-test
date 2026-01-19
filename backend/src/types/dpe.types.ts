/**
 * Types pour les données DPE (Diagnostic de Performance Énergétique)
 */

// Classes énergétiques possibles
export type ClasseEnergetique = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "N";

// Classes GES (Gaz à Effet de Serre)
export type ClasseGES = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "N";

// Données DPE simplifiées retournées par l'API
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

// Réponse brute de l'API ADEME
export interface ADEMERawResult {
  numero_dpe: string;
  tr001_modele_dpe_id: number;
  nom_methode_dpe: string;
  date_visite_diagnostiqueur: string;
  date_etablissement_dpe: string;
  consommation_energie: number;
  classe_consommation_energie: string;
  estimation_ges: number;
  classe_estimation_ges: string;
  secteur_activite: string;
  annee_construction: number | null;
  surface_habitable: number | null;
  adresse: string;
  code_postal: string;
  code_insee_commune_actualise: string;
  nom_commune: string;
  _geopoint: string;
  geo_adresse: string;
}

// Réponse de l'API ADEME
export interface ADEMEResponse {
  total: number;
  results: ADEMERawResult[];
}

// Requête de recherche DPE
export interface DPESearchRequest {
  address: string;
  radius?: number; // en mètres, défaut 500
}

// Réponse de recherche DPE
export interface DPESearchResponse {
  results: DPE[];
  center: {
    lat: number;
    lon: number;
  };
  total: number;
}

// Résultat du géocodage
export interface GeocodingResult {
  lat: number;
  lon: number;
  label: string;
}
