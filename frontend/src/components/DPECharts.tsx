import { Box, Text } from "@chakra-ui/react";
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

interface DPEChartsProps {
    dpes: DPE[];
}

const DIAGNOSTIQUED_ENERGETIC_CLASSES = ["A", "B", "C", "D", "E", "F", "G"] satisfies Omit<ClasseEnergetique, "N">[];
const DIAGNOSTIQUED_GES_CLASSES = ["A", "B", "C", "D", "E", "F", "G"] satisfies Omit<ClasseGES, "N">[];

export function DPECharts({ dpes }: DPEChartsProps) {
    const energieData = DIAGNOSTIQUED_ENERGETIC_CLASSES.map((classe) => ({
        classe,
        nombre: dpes.filter((dpe) => dpe.classeEnergetique === classe).length,
    }));

    const gesData = DIAGNOSTIQUED_GES_CLASSES.map((classe) => ({
        classe,
        nombre: dpes.filter((dpe) => dpe.classeGES === classe).length,
    }));

    return (
        <>
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
        </>
    );
}

