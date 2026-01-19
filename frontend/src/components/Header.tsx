import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";

export function Header() {
    return (
        <Box bg="blue.600" color="white" py={4} px={6} boxShadow="md">
            <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
                <Box>
                    <Heading size="lg" fontWeight="bold">
                        🏠 Visualisation des DPE
                    </Heading>
                    <Text fontSize="sm" mt={1} opacity={0.9}>
                        Recherchez une adresse pour afficher les Diagnostics de Performance
                        Énergétique
                    </Text>
                </Box>
                <Box
                    as={Link}
                    href="https://www.ithaque-renovation.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="green.500"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight="semibold"
                    fontSize="md"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    _hover={{
                        bg: "green.600",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                    }}
                    transition="all 0.2s"
                    textDecoration="none"
                >
                    <Text fontSize="lg">⚡</Text>
                    <Text>Ma rénovation énergétique en 3 clics</Text>
                </Box>
            </Flex>
        </Box>
    );
}

