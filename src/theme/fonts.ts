/**
 * Centralized Font Theme
 * All fonts used throughout the application should reference these values
 */

// Base Font Families
const baseFonts = {
  primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  monospace: '"Courier New", Courier, monospace',
} as const;

export const fonts = {
  // Base Font Families (for manual composition)
  families: baseFonts,
  
  // Font Weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Font Sizes (responsive using clamp)
  sizes: {
    xs: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    sm: 'clamp(0.875rem, 2vw, 1rem)',
    base: 'clamp(1rem, 2.5vw, 1.125rem)',
    lg: 'clamp(1.125rem, 3vw, 1.25rem)',
    xl: 'clamp(1.25rem, 3.5vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 4vw, 2rem)',
    '3xl': 'clamp(2rem, 5vw, 3rem)',
    '4xl': 'clamp(2.5rem, 6vw, 4rem)',
  },
  
  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    wider: '0.08em',
    widest: '0.1em',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  // ===========================================
  // SPECIFIC USE CASE FONT STYLES
  // Complete font definitions for common UI elements
  // ===========================================
  
  // Page Headers (large titles like "ArcadeX" on coming soon page)
  pageHeader: {
    fontFamily: '"Helvetica Neue", "Inter", "Roboto", Arial, sans-serif',
    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
    fontWeight: 600,
    letterSpacing: '0.01em',
    lineHeight: 1,
  },
  
  // Section Headers (like "Exchange", "Portfolio" page titles)
  sectionHeader: {
    fontFamily: baseFonts.heading,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 600,
    letterSpacing: '0.05em',
    lineHeight: 1.2,
  },
  
  // Subheaders (like card titles, section labels)
  subheader: {
    fontFamily: baseFonts.heading,
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  
  // Body Text (paragraphs, descriptions)
  bodyText: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Small Text (secondary info, labels)
  smallText: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Button Text (primary buttons)
  button: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1,
  },
  
  // Button Text Large (prominent CTAs)
  buttonLarge: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1,
  },
  
  // Navigation Links (navbar items)
  navLink: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: 1.5,
  },
  
  // Logo Text (brand name)
  logo: {
    fontFamily: baseFonts.heading,
    fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    lineHeight: 1,
  },
  
  // Input Fields
  input: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Labels (form labels, data labels)
  label: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: 1.5,
  },
  
  // Data Display (numbers, prices, stats)
  dataDisplay: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: 600,
    letterSpacing: '0',
    lineHeight: 1.2,
  },
  
  // Data Display Small (table cells, compact info)
  dataDisplaySmall: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 500,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Captions (help text, footnotes)
  caption: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Monospace (code, addresses, technical data)
  monospace: {
    fontFamily: baseFonts.monospace,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 400,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Tab Labels
  tab: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1.5,
  },
  
  // Dropdown Items
  dropdown: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
    fontWeight: 600,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
  
  // Modal/Popup Titles
  modalTitle: {
    fontFamily: baseFonts.heading,
    fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  
  // Toast/Alert Messages
  alert: {
    fontFamily: baseFonts.body,
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    fontWeight: 500,
    letterSpacing: '0',
    lineHeight: 1.5,
  },
} as const;

// Type for better TypeScript support
export type FontKey = keyof typeof fonts;
export type FontWeightKey = keyof typeof fonts.weights;
export type FontSizeKey = keyof typeof fonts.sizes;
export type LetterSpacingKey = keyof typeof fonts.letterSpacing;
export type LineHeightKey = keyof typeof fonts.lineHeight;

