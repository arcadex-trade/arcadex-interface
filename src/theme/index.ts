/**
 * Centralized Theme System
 * Export all theme-related constants and utilities
 */

export { colors } from './colors';
export type { ColorKey, SolanaColorKey } from './colors';

export { fonts } from './fonts';
export type { FontKey, FontWeightKey, FontSizeKey, LetterSpacingKey, LineHeightKey } from './fonts';

// Re-export commonly used colors for convenience
import { colors } from './colors';
export const {
  mainBackgroundColor,
  mainSectionColor,
  mainBorderColor,
  mainTextColor,
  secondaryTextColor,
  mainAccentColor,
  successColor,
  errorColor,
} = colors;

// Re-export commonly used fonts for convenience
import { fonts } from './fonts';
export const {
  primary: primaryFont,
  heading: headingFont,
  body: bodyFont,
  monospace: monospaceFont,
  weights: fontWeights,
  sizes: fontSizes,
} = fonts;
