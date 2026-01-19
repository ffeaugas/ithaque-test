"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDPEByLocation = searchDPEByLocation;
const ADEME_API_URL = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe-france/lines";
/**
 * Convertit un résultat brut de l'API ADEME en objet DPE simplifié
 */
function mapADEMEResultToDPE(raw) {
    // Extraction des coordonnées depuis le champ _geopoint (format: "lat,lon")
    if (!raw._geopoint) {
        return null;
    }
    const [latStr, lonStr] = raw._geopoint.split(",");
    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lonStr);
    if (isNaN(latitude) || isNaN(longitude)) {
        return null;
    }
    // Validation de la classe énergétique
    const validClasses = ["A", "B", "C", "D", "E", "F", "G", "N"];
    const classeEnergetique = validClasses.includes(raw.classe_consommation_energie)
        ? raw.classe_consommation_energie
        : "N";
    const classeGES = validClasses.includes(raw.classe_estimation_ges)
        ? raw.classe_estimation_ges
        : "N";
    return {
        id: raw.numero_dpe,
        adresse: raw.adresse || raw.geo_adresse || "Adresse non disponible",
        codePostal: raw.code_postal || "",
        commune: raw.nom_commune || "",
        classeEnergetique,
        classeGES,
        surfaceHabitable: raw.surface_habitable,
        anneeConstruction: raw.annee_construction,
        latitude,
        longitude,
        dateDiagnostic: raw.date_etablissement_dpe || null,
    };
}
/**
 * Recherche les DPE autour d'une position géographique
 * @param lon Longitude du centre de recherche
 * @param lat Latitude du centre de recherche
 * @param radius Rayon de recherche en mètres (défaut: 500m)
 * @param limit Nombre maximum de résultats (défaut: 100)
 */
async function searchDPEByLocation(lon, lat, radius = 500, limit = 100) {
    try {
        // L'API ADEME utilise le format geo_distance=lon:lat:distance
        const params = new URLSearchParams({
            geo_distance: `${lon}:${lat}:${radius}`,
            size: limit.toString(),
        });
        const response = await fetch(`${ADEME_API_URL}?${params}`);
        if (!response.ok) {
            console.error(`Erreur lors de l'appel à l'API ADEME: ${response.status}`);
            return [];
        }
        const data = await response.json();
        // Conversion des résultats bruts en objets DPE
        const dpes = [];
        for (const raw of data.results) {
            const dpe = mapADEMEResultToDPE(raw);
            if (dpe) {
                dpes.push(dpe);
            }
        }
        return dpes;
    }
    catch (error) {
        console.error("Erreur lors de la recherche DPE:", error);
        return [];
    }
}
