import { useState, useEffect, useCallback } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { getAddressSuggestions } from "../services/api";
import { RadiusSlider } from "./RadiusSlider";
import type { AddressSuggestion } from "../types/dpe";

interface AddressSearchProps {
  onSearch: (address: string, radius: number) => void;
  isLoading: boolean;
}

export function AddressSearch({ onSearch, isLoading }: AddressSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [radius, setRadius] = useState(500);

  // Debounce pour éviter trop d'appels API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3) {
        const results = await getAddressSuggestions(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectSuggestion = useCallback(
    (suggestion: AddressSuggestion) => {
      setQuery(suggestion.label);
      setShowSuggestions(false);
      onSearch(suggestion.label, radius);
    },
    [onSearch, radius]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        setShowSuggestions(false);
        onSearch(query.trim(), radius);
      }
    },
    [query, onSearch, radius]
  );

  return (
    <Box position="relative" width="100%" maxW="900px">
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} alignItems="flex-start">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez une adresse (ex: 10 rue de Rivoli Paris)"
            size="lg"
            bg="white"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            flex={1}
          />
          <RadiusSlider value={radius} onChange={setRadius} />
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            loading={isLoading}
            disabled={!query.trim() || isLoading}
            px={8}
          >
            Rechercher
          </Button>
        </Box>
      </form>

      {/* Liste des suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={1}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
          zIndex={1000}
          align="stretch"
          gap={0}
        >
          {suggestions.map((suggestion, index) => (
            <Box
              key={index}
              px={4}
              py={3}
              cursor="pointer"
              _hover={{ bg: "blue.50" }}
              onClick={() => handleSelectSuggestion(suggestion)}
              borderBottom={
                index < suggestions.length - 1 ? "1px solid" : "none"
              }
              borderColor="gray.100"
            >
              <Text fontSize="sm">{suggestion.label}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
