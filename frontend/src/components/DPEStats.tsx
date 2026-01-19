import { Box, Text, VStack } from "@chakra-ui/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { ClasseEnergetique, ClasseGES, DPE } from "../types/dpe";

interface DPEStatsProps {
    dpes: DPE[];
}

const DIAGNOSTIQUED_ENERGETIC_CLASSES = ["A", "B", "C", "D", "E", "F", "G"] satisfies Omit<ClasseEnergetique, "N">[];
const DIAGNOSTIQUED_GES_CLASSES = ["A", "B", "C", "D", "E", "F", "G"] satisfies Omit<ClasseGES, "N">[];

export function DPEStats({ dpes }: DPEStatsProps) {
    if (dpes.length === 0) {
        return null;
    }

    const undiagnosedCount = dpes.filter(
        (dpe) => dpe.classeEnergetique === "N" || dpe.classeGES === "N"
    ).length;

    const undiagnosedPercentage = Math.round((undiagnosedCount / dpes.length) * 100);

    const energieData = DIAGNOSTIQUED_ENERGETIC_CLASSES.map((classe) => ({
        classe,
        nombre: dpes.filter((dpe) => dpe.classeEnergetique === classe).length,
    }));

    const gesData = DIAGNOSTIQUED_GES_CLASSES.map((classe) => ({
        classe,
        nombre: dpes.filter((dpe) => dpe.classeGES === classe).length,
    }));

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
                <Text fontSize="md" fontWeight="bold">
                    Statistiques du quartier
                </Text>
                <Text fontSize="sm" fontWeight="normal">
                    Taux de diagnostic : {100 - undiagnosedPercentage}%
                </Text>

                <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        Répartition par Classe Énergétique
                    </Text>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={energieData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="classe" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="nombre" fill="#3182ce" name="Nombre de DPE" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

                <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        Répartition par Classe GES
                    </Text>
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart data={gesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="classe" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="nombre" fill="#38a169" name="Nombre de DPE" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </VStack>
        </Box>
    );
}