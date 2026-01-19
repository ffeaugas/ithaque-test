import type { DPE } from "../types/dpe.types.js";
/**
 * Recherche les DPE autour d'une position géographique
 * @param lon Longitude du centre de recherche
 * @param lat Latitude du centre de recherche
 * @param radius Rayon de recherche en mètres (défaut: 500m)
 * @param limit Nombre maximum de résultats (défaut: 100)
 */
export declare function searchDPEByLocation(lon: number, lat: number, radius?: number, limit?: number): Promise<DPE[]>;
