// types.ts
export interface ColorInfo {
  hex: string;
  name: string;
  rgb: string;
  hsl: string;
  value: string; // Add this to make it compatible with Color
  toString(): string;
}

export type Color = ColorInfo; // Make Color and ColorInfo the same type

export interface ColorPaletteState {
  colors: Color[];
  undoStack: Color[][];
  redoStack: Color[][];
  preferences: UserPreferences;
}

export interface PaletteMetadata {
  name: string;
  created: Date;
  tags: string[];
}

export interface SavedPalette extends PaletteMetadata {
  colors: Color[];
}

export interface UserPreferences {
  defaultColorCount: number;
  preferredColorFormat: 'hex' | 'rgb' | 'hsl';
  autoExportFormat: string;
  keyboardShortcuts: Record<string, string>;
  maxStackSize: number;
}

export interface AccessibilityCheck {
  wcag2Level: 'AA' | 'AAA';
  colorBlindness: {
    protanopia: boolean;
    deuteranopia: boolean;
    tritanopia: boolean;
  };
}

export type ColorTheoryMode = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'random';
