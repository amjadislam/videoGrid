export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export type SpacingKey = keyof typeof spacing; 