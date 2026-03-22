export const themeEngine = {
  purple: {
    light: { bg: '#FEF7FF', surface: '#F3EDF7', surfaceHigh: '#E8DEF8', primary: '#6750A4', onPrimary: '#FFFFFF', primaryContainer: '#EADDFF', onPrimaryContainer: '#21005D', text: '#1D1B20', textMuted: '#49454F', success: '#146C2E', warning: '#BA1A1A', tint: 'rgba(103, 80, 164, 0.05)', blob1: '#EADDFF', blob2: '#D0BCFF' },
    dark:  { bg: '#141218', surface: '#211F26', surfaceHigh: '#2B2930', primary: '#D0BCFF', onPrimary: '#381E72', primaryContainer: '#4F378B', onPrimaryContainer: '#EADDFF', text: '#E6E0E9', textMuted: '#CAC4D0', success: '#78DC77', warning: '#FFB4AB', tint: 'rgba(208, 188, 255, 0.12)', blob1: '#4F378B', blob2: '#381E72' }
  },
  emerald: {
    light: { bg: '#F4FBF4', surface: '#E8F5E9', surfaceHigh: '#C8E6C9', primary: '#2E7D32', onPrimary: '#FFFFFF', primaryContainer: '#A5D6A7', onPrimaryContainer: '#003300', text: '#1A1C1A', textMuted: '#4A4C4A', success: '#2E7D32', warning: '#BA1A1A', tint: 'rgba(46, 125, 50, 0.05)', blob1: '#C8E6C9', blob2: '#A5D6A7' },
    dark:  { bg: '#171C17', surface: '#1E241E', surfaceHigh: '#262D26', primary: '#81C784', onPrimary: '#003300', primaryContainer: '#2E7D32', onPrimaryContainer: '#C8E6C9', text: '#E1E3E1', textMuted: '#C1C5C1', success: '#81C784', warning: '#FFB4AB', tint: 'rgba(129, 199, 132, 0.12)', blob1: '#2E7D32', blob2: '#1B5E20' }
  },
  ocean: {
    light: { bg: '#F8FDFF', surface: '#E1F5FE', surfaceHigh: '#B3E5FC', primary: '#0277BD', onPrimary: '#FFFFFF', primaryContainer: '#81D4FA', onPrimaryContainer: '#002940', text: '#191C1D', textMuted: '#40484C', success: '#0277BD', warning: '#BA1A1A', tint: 'rgba(2, 119, 189, 0.05)', blob1: '#B3E5FC', blob2: '#81D4FA' },
    dark:  { bg: '#151C1F', surface: '#1D2529', surfaceHigh: '#252F34', primary: '#4FC3F7', onPrimary: '#002940', primaryContainer: '#0277BD', onPrimaryContainer: '#B3E5FC', text: '#E1E3E4', textMuted: '#BFC8CC', success: '#4FC3F7', warning: '#FFB4AB', tint: 'rgba(79, 195, 247, 0.12)', blob1: '#0277BD', blob2: '#01579B' }
  }
};

export const physics = {
  expressive: { type: 'spring', stiffness: 250, damping: 25, mass: 1 },
  morph: { type: 'spring', stiffness: 100, damping: 20, mass: 1.2 },
  expand: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
  layout: { type: "spring", stiffness: 350, damping: 30 },
  interactive: { stiffness: 40, damping: 30, mass: 1 },
  tooltip: { type: 'spring', stiffness: 500, damping: 30 },
  organic: { type: 'spring', stiffness: 200, damping: 20, mass: 1 },
  sheet: { type: "spring", stiffness: 300, damping: 30, mass: 1 }
};
