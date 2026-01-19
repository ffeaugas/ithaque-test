import type { GeocodingResult } from "../types/dpe.types.js";
/**
 * Service de géocodage utilisant l'API adresse.data.gouv.fr
 * Convertit une adresse textuelle en coordonnées GPS
 */
export declare function geocodeAddress(address: string): Promise<GeocodingResult | null>;
