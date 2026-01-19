"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodeAddress = geocodeAddress;
const GEOCODING_API_URL = "https://api-adresse.data.gouv.fr/search/";
/**
 * Service de géocodage utilisant l'API adresse.data.gouv.fr
 * Convertit une adresse textuelle en coordonnées GPS
 */
async function geocodeAddress(address) {
    try {
        const params = new URLSearchParams({
            q: address,
            limit: "1",
        });
        const response = await fetch(`${GEOCODING_API_URL}?${params}`);
        if (!response.ok) {
            console.error(`Erreur lors du géocodage: ${response.status}`);
            return null;
        }
        const data = await response.json();
        if (!data.features || data.features.length === 0) {
            console.warn(`Aucun résultat trouvé pour l'adresse: ${address}`);
            return null;
        }
        const feature = data.features[0];
        const [lon, lat] = feature.geometry.coordinates;
        return {
            lat,
            lon,
            label: feature.properties.label,
        };
    }
    catch (error) {
        console.error("Erreur lors du géocodage:", error);
        return null;
    }
}
