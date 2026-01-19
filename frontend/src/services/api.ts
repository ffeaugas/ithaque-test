import type { DPESearchResponse, AddressSuggestion } from "../types/dpe";

const API_BASE_URL = "http://localhost:3001";
const GEOCODING_API_URL = "https://api-adresse.data.gouv.fr/search/";

/**
 * Recherche les DPE autour d'une adresse
 */
export async function searchDPE(
  address: string,
  radius: number = 500
): Promise<DPESearchResponse> {
  const response = await fetch(`${API_BASE_URL}/api/dpe/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, radius }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erreur lors de la recherche");
  }

  return response.json();
}

/**
 * Récupère les suggestions d'adresses pour l'autocomplétion
 */
export async function getAddressSuggestions(
  query: string
): Promise<AddressSuggestion[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      q: query,
      limit: "5",
    });

    const response = await fetch(`${GEOCODING_API_URL}?${params}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    return data.features.map(
      (feature: {
        geometry: { coordinates: number[] };
        properties: { label: string };
      }) => ({
        label: feature.properties.label,
        lon: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
      })
    );
  } catch {
    return [];
  }
}
