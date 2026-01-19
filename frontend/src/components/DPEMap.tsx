import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import { DPEMarker } from "./DPEMarker";
import { DPEStats } from "./DPEStats";
import type { DPE } from "../types/dpe";
import "leaflet/dist/leaflet.css";

interface DPEMapProps {
  dpes: DPE[];
  center: { lat: number; lon: number } | null;
}

// Composant pour recentrer la carte quand le centre change
function MapController({
  center,
}: {
  center: { lat: number; lon: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lon], 16, {
        duration: 1.5,
      });
    }
  }, [center, map]);

  return null;
}

export function DPEMap({ dpes, center }: DPEMapProps) {
  // Position par défaut : Paris
  const defaultCenter: [number, number] = [48.8566, 2.3522];
  const initialCenter: [number, number] = center
    ? [center.lat, center.lon]
    : defaultCenter;
  const [isStatsVisible, setIsStatsVisible] = useState(true);


  return (
    <Box
      height="100%"
      width="100%"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      position="relative"
    >
      <MapContainer
        center={initialCenter}
        zoom={center ? 16 : 12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} />
        {dpes.map((dpe) => (
          <DPEMarker key={dpe.id} dpe={dpe} />
        ))}
      </MapContainer>

      {/* Stats dans le coin supérieur droit */}
      {dpes.length > 0 && (
        <Box
          position="absolute"
          top={4}
          right={4}
          zIndex={1000}
        >
          <DPEStats
            dpes={dpes}
            isVisible={isStatsVisible}
            onToggle={() => setIsStatsVisible(!isStatsVisible)}
          />
        </Box>
      )}
    </Box>
  );
}
