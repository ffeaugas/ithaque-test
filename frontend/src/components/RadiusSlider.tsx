import { Box, Text, HStack } from "@chakra-ui/react";

interface RadiusSliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export function RadiusSlider({
    value,
    onChange,
    min = 100,
    max = 1000,
    step = 50,
}: RadiusSliderProps) {
    return (
        <Box bg="white" p={3} borderRadius="md" border="1px solid" borderColor="gray.200" minW="200px">
            <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="gray.700">
                    Rayon:
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    {value}m
                </Text>
            </HStack>
            <Box position="relative" width="100%">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{
                        width: "100%",
                        height: "6px",
                        borderRadius: "3px",
                        background: `linear-gradient(to right, #3182ce 0%, #3182ce ${((value - min) / (max - min)) * 100}%, #e2e8f0 ${((value - min) / (max - min)) * 100}%, #e2e8f0 100%)`,
                        outline: "none",
                        WebkitAppearance: "none",
                        appearance: "none",
                    }}
                    onMouseDown={(e) => {
                        const input = e.currentTarget;
                        input.style.cursor = "grabbing";
                    }}
                    onMouseUp={(e) => {
                        const input = e.currentTarget;
                        input.style.cursor = "grab";
                    }}
                />
                <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 10px;
            border-radius: 50%;
            background: #3182ce;
            cursor: grab;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            background: #2c5aa0;
          }
          input[type="range"]::-webkit-slider-thumb:active {
            cursor: grabbing;
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #3182ce;
            cursor: grab;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          input[type="range"]::-moz-range-thumb:hover {
            background: #2c5aa0;
          }
          input[type="range"]::-moz-range-thumb:active {
            cursor: grabbing;
          }
        `}</style>
            </Box>
            <HStack justify="space-between" mt={1}>
                <Text fontSize="xs" color="gray.500">
                    {min}m
                </Text>
                <Text fontSize="xs" color="gray.500">
                    {max}m
                </Text>
            </HStack>
        </Box>
    );
}

