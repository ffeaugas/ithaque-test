import { useState, useCallback } from "react";
import { Box, Flex, Heading, Text, Alert } from "@chakra-ui/react";
import { AddressSearch } from "./components/AddressSearch";
import { DPEMap } from "./components/DPEMap";
import { searchDPE } from "./services/api";
import type { DPE } from "./types/dpe";

function App() {
  const [dpes, setDpes] = useState<DPE[]>([]);
  const [center, setCenter] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (address: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchDPE(address, 500);
      setDpes(response.results);
      setCenter(response.center);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setDpes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="blue.600" color="white" py={4} px={6} boxShadow="md">
        <Heading size="lg" fontWeight="bold">
          🏠 Visualisation des DPE
        </Heading>
        <Text fontSize="sm" mt={1} opacity={0.9}>
          Recherchez une adresse pour afficher les Diagnostics de Performance
          Énergétique
        </Text>
      </Box>

      {/* Barre de recherche */}
      <Flex
        justify="center"
        py={6}
        px={4}
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <AddressSearch onSearch={handleSearch} isLoading={isLoading} />
      </Flex>

      {/* Message d'erreur */}
      {error && (
        <Box px={4} py={2}>
          <Alert.Root status="error" borderRadius="md">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        </Box>
      )}

      {/* Carte */}
      <Box height="calc(100vh - 180px)" p={4}>
        {!hasSearched && !center ? (
          <Flex
            height="100%"
            align="center"
            justify="center"
            bg="white"
            borderRadius="lg"
            boxShadow="md"
          >
            <Box textAlign="center" color="gray.500">
              <Text fontSize="4xl" mb={4}>
                🗺️
              </Text>
              <Text fontSize="lg">
                Entrez une adresse ci-dessus pour afficher les DPE sur la carte
              </Text>
            </Box>
          </Flex>
        ) : (
          <DPEMap dpes={dpes} center={center} />
        )}
      </Box>
    </Box>
  );
}

export default App;
