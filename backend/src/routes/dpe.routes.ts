import { Router, Request, Response } from "express";
import { geocodeAddress } from "../services/geocoding.service.js";
import { searchDPEByLocation } from "../services/ademe.service.js";
import type {
  DPESearchRequest,
  DPESearchResponse,
} from "../types/dpe.types.js";

const router = Router();

/**
 * POST /api/dpe/search
 * Recherche les DPE autour d'une adresse donnée
 */
router.post("/search", async (req: Request, res: Response) => {
  try {
    const { address, radius = 500 }: DPESearchRequest = req.body;

    if (!address || typeof address !== "string") {
      res.status(400).json({
        error:
          'Le paramètre "address" est requis et doit être une chaîne de caractères.',
      });
      return;
    }

    // Étape 1: Géocodage de l'adresse
    const geocodingResult = await geocodeAddress(address);

    if (!geocodingResult) {
      res.status(404).json({
        error:
          "Impossible de trouver cette adresse. Veuillez vérifier et réessayer.",
      });
      return;
    }

    // Étape 2: Recherche des DPE autour de cette position
    const dpes = await searchDPEByLocation(
      geocodingResult.lon,
      geocodingResult.lat,
      radius
    );

    const response: DPESearchResponse = {
      results: dpes,
      center: {
        lat: geocodingResult.lat,
        lon: geocodingResult.lon,
      },
      total: dpes.length,
    };

    res.json(response);
  } catch (error) {
    console.error("Erreur lors de la recherche DPE:", error);
    res.status(500).json({
      error: "Une erreur interne est survenue lors de la recherche.",
    });
  }
});

export default router;
