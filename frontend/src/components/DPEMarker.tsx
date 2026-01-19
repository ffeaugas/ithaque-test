import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { DPE, ClasseEnergetique } from "../types/dpe";

// Couleurs par classe énergétique
const CLASSE_COLORS: Record<ClasseEnergetique, string> = {
  A: "#319834", // Vert foncé
  B: "#33cc31", // Vert
  C: "#cbfc34", // Vert clair
  D: "#fbfe06", // Jaune
  E: "#fbcc05", // Orange clair
  F: "#f99b04", // Orange
  G: "#ee1d22", // Rouge
  N: "#999999", // Gris (non classé)
};

// Création d'une icône personnalisée pour chaque classe
function createDPEIcon(classe: ClasseEnergetique): L.DivIcon {
  const color = CLASSE_COLORS[classe];
  return L.divIcon({
    className: "dpe-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        color: ${classe === "C" || classe === "D" ? "#333" : "white"};
      ">
        ${classe}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

interface DPEMarkerProps {
  dpe: DPE;
}

export function DPEMarker({ dpe }: DPEMarkerProps) {
  const icon = createDPEIcon(dpe.classeEnergetique);

  return (
    <Marker position={[dpe.latitude, dpe.longitude]} icon={icon}>
      <Popup>
        <div style={{ minWidth: "200px" }}>
          <h3
            style={{
              margin: "0 0 8px 0",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {dpe.adresse}
          </h3>
          <p style={{ margin: "4px 0", fontSize: "13px", color: "#666" }}>
            {dpe.codePostal} {dpe.commune}
          </p>
          <hr style={{ margin: "8px 0", borderColor: "#eee" }} />
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: CLASSE_COLORS[dpe.classeEnergetique],
                  color:
                    dpe.classeEnergetique === "C" ||
                      dpe.classeEnergetique === "D"
                      ? "#333"
                      : "white",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {dpe.classeEnergetique}
              </div>
              <small style={{ color: "#666" }}>Énergie</small>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: CLASSE_COLORS[dpe.classeGES],
                  color:
                    dpe.classeGES === "C" || dpe.classeGES === "D"
                      ? "#333"
                      : "white",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {dpe.classeGES}
              </div>
              <small style={{ color: "#666" }}>GES</small>
            </div>
          </div>
          {dpe.surfaceHabitable && (
            <p style={{ margin: "8px 0 0 0", fontSize: "12px", color: "#666" }}>
              Surface : {dpe.surfaceHabitable} m²
            </p>
          )}
          {dpe.anneeConstruction && (
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#666" }}>
              Construction : {dpe.anneeConstruction}
            </p>
          )}
          <hr style={{ margin: "8px 0", borderColor: "#eee" }} />
          <a
            href={`https://observatoire-dpe-audit.ademe.fr/afficher-dpe/${dpe.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              backgroundColor: "#0063cb",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            Voir sur l'observatoire ADEME
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
