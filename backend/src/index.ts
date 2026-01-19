import express from "express";
import cors from "cors";
import dpeRoutes from "./routes/dpe.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/dpe", dpeRoutes);

// Route de santé
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  console.log(
    `📊 Endpoint DPE disponible sur http://localhost:${PORT}/api/dpe/search`
  );
});
