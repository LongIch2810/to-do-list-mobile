/**
 * Design Tokens based on DESIGN.md (Facebook Design System Foundations)
 * Target: WCAG 2.2 AA Accessibility compliant
 */

export const colors = {
  // Brand & Accent Colors
  primary: '#1877F2',
  primaryDark: '#166FE5',
  primaryLight: '#E7F3FF',

  // Text Semantic Colors (from DESIGN.md)
  text: '#1c1e21',          // color.text.primary
  textPrimary: '#1c1e21',   // color.text.primary
  textSecondary: '#385898', // color.text.secondary (link / accent)
  textTertiary: '#65686c',  // color.text.tertiary (subtle / muted)
  textInverse: '#ffffff',   // color.text.inverse

  // Surface Semantic Colors (from DESIGN.md)
  background: '#f0f2f5',    // color.surface.strong (main canvas background)
  surface: '#ffffff',       // color.surface.raised (card, modal, active elements)
  surfaceMuted: '#e2e5e9',  // color.surface.muted
  surfaceBase: '#000000',   // color.surface.base

  // Borders & Dividers
  border: '#ccd0d5',        // standard Facebook divider/border
  borderLight: '#e4e6eb',

  // Status Colors
  error: '#FA383E',
  errorBg: '#FEE2E2',
  errorBorder: '#FCA5A5',
  success: '#00A400',
  successBg: '#DCFCE7',
  warning: '#F5A623',
  warningBg: '#FEF3C7',
};

export const spacing = {
  // Direct scale from DESIGN.md: space.1=4px, space.2=7px, space.3=8px, space.4=9px, space.5=12px, space.6=13px, space.7=16px
  space1: 4,
  space2: 7,
  space3: 8,
  space4: 9,
  space5: 12,
  space6: 13,
  space7: 16,

  // Semantic t-shirt sizes
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  // Typography scale from DESIGN.md (xs=12px, sm=13px, md=15px, lg=17px + extended xl/xxl)
  sizes: {
    xs: 12, // font.size.xs
    sm: 13, // font.size.sm
    md: 15, // font.size.md (base)
    lg: 17, // font.size.lg
    xl: 20,
    xxl: 24,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    base: 16.08,
    md: 20,
    lg: 22,
    xxl: 28,
  },
  fontFamily: 'Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif',
};

export const metrics = {
  // Accessibility WCAG 2.2 AA: minimum 48x48dp touch target
  minTouchTarget: 48,

  // Radius tokens from DESIGN.md (xs=8px, sm=10px, md=20px, lg=30px, xl=50px, 2xl=999px)
  borderRadius: {
    xs: 8,
    sm: 10,
    md: 20,
    lg: 30,
    xl: 50,
    full: 999,
  },
};

export const shadows = {
  // Shadow tokens from DESIGN.md
  shadow1: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  shadow2: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  shadow3: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  shadow4: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const motion = {
  // Motion tokens from DESIGN.md
  duration: {
    instant: 100,
    fast: 200,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  metrics,
  shadows,
  motion,
};

export type Theme = typeof theme;
