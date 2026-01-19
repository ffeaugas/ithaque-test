import { Box, Text, VStack, IconButton, Button } from "@chakra-ui/react";
import type { DPE } from "../types/dpe";
import { DPECharts } from "./DPECharts";

interface DPEStatsProps {
    dpes: DPE[];
    onToggle: () => void;
    isVisible: boolean;
}

export function DPEStats({ dpes, onToggle, isVisible }: DPEStatsProps) {
    if (dpes.length === 0) {
        return null;
    }

    if (!isVisible) {
        return (
            <Box
                bg="white"
                px={3}
                py={2}
                borderRadius="md"
                boxShadow="md"
                zIndex={1000}
            >
                <Box display="flex" alignItems="center" gap={2}>
                    <Text fontSize="sm" fontWeight="bold">
                        {dpes.length} DPE trouvé{dpes.length > 1 ? "s" : ""}
                    </Text>
                    <IconButton
                        aria-label="Afficher les statistiques"
                        size="xs"
                        onClick={onToggle}
                        variant="ghost"
                    >
                        <Text
                            fontSize="sm"
                            transform={isVisible ? "rotate(180deg)" : "rotate(0deg)"}
                            transition="transform 0.2s"
                            display="inline-block"
                        >
                            ▼
                        </Text>
                    </IconButton>
                </Box>
            </Box>
        );
    }

    const undiagnosedCount = dpes.filter(
        (dpe) => dpe.classeEnergetique === "N" || dpe.classeGES === "N"
    ).length;

    const undiagnosedPercentage = Math.round((undiagnosedCount / dpes.length) * 100);

    return (
        <Box
            bg="white"
            px={3}
            py={2}
            borderRadius="md"
            boxShadow="md"
            zIndex={1000}
            maxW="600px"
            maxH="600px"
            overflowY="auto"
        >
            <VStack gap={4} align="stretch">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize="md" fontWeight="bold">
                        Statistiques du quartier
                    </Text>
                    <IconButton
                        aria-label="Masquer les statistiques"
                        size="xs"
                        onClick={onToggle}
                        variant="ghost"
                    >
                        <Text
                            fontSize="sm"
                            transform={isVisible ? "rotate(180deg)" : "rotate(0deg)"}
                            transition="transform 0.2s"
                            display="inline-block"
                        >
                            ▼
                        </Text>
                    </IconButton>
                </Box>
                <Text fontSize="sm" fontWeight="bold">
                    {dpes.length} DPE trouvé{dpes.length > 1 ? "s" : ""}
                </Text>
                <Text fontSize="sm" fontWeight="normal">
                    Taux de diagnostic : {100 - undiagnosedPercentage}%
                </Text>

                <DPECharts dpes={dpes} />

                <Button
                    as="a"
                    href="https://www.ithaque-renovation.fr/simulateur-dpe"
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="green"
                    variant="solid"
                    size="sm"
                    leftIcon={<span>⚡</span>}
                >
                    Je simule mon DPE
                </Button>
            </VStack>
        </Box>
    );
}