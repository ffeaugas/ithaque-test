"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geocoding_service_js_1 = require("../services/geocoding.service.js");
const ademe_service_js_1 = require("../services/ademe.service.js");
const router = (0, express_1.Router)();
/**
 * POST /api/dpe/search
 * Recherche les DPE autour d'une adresse donnée
 */
router.post("/search", async (req, res) => {
    try {
        const { address, radius = 500 } = req.body;
        if (!address || typeof address !== "string") {
            res.status(400).json({
                error: 'Le paramètre "address" est requis et doit être une chaîne de caractères.',
            });
            return;
        }
        // Étape 1: Géocodage de l'adresse
        const geocodingResult = await (0, geocoding_service_js_1.geocodeAddress)(address);
        if (!geocodingResult) {
            res.status(404).json({
                error: "Impossible de trouver cette adresse. Veuillez vérifier et réessayer.",
            });
            return;
        }
        // Étape 2: Recherche des DPE autour de cette position
        const dpes = await (0, ademe_service_js_1.searchDPEByLocation)(geocodingResult.lon, geocodingResult.lat, radius);
        const response = {
            results: dpes,
            center: {
                lat: geocodingResult.lat,
                lon: geocodingResult.lon,
            },
            total: dpes.length,
        };
        res.json(response);
    }
    catch (error) {
        console.error("Erreur lors de la recherche DPE:", error);
        res.status(500).json({
            error: "Une erreur interne est survenue lors de la recherche.",
        });
    }
});
exports.default = router;
