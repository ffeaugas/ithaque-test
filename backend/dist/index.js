"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dpe_routes_js_1 = __importDefault(require("./routes/dpe.routes.js"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/dpe", dpe_routes_js_1.default);
// Route de santé
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
    console.log(`📊 Endpoint DPE disponible sur http://localhost:${PORT}/api/dpe/search`);
});
