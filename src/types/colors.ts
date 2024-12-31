// types/colors.ts
export interface SolidColor {
  name: string;
  color: string;
}

export interface GradientColor {
  name: string;
  colors: string[];
}

export type ColorData = SolidColor | GradientColor;

export interface CardOptions {
  opacity?: number | undefined;
  direction?: 'linear' | 'radial' | 'conic';
  angle?: number | undefined;
}
