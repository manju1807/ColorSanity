// services/ColorTheoryService.ts
import tinycolor from 'tinycolor2';
import { Color, ColorTheoryMode } from '../types/colorPallete';

export class ColorTheoryService {
  private generateRandomHex(): string {
    return tinycolor.random().toHexString();
  }

  private getColorName(hex: string): string {
    // Implement color naming logic or use a color naming library
    return `Color ${hex}`;
  }

  private convertToColorObject(hex: string): Color {
    const color = tinycolor(hex);
    return {
      hex: color.toHexString(),
      rgb: color.toRgbString(),
      hsl: color.toHslString(),
      name: this.getColorName(hex),
    };
  }

  public async generatePalette(
    mode: ColorTheoryMode,
    count: number,
    baseColor?: string
  ): Promise<Color[]> {
    const baseHex = baseColor || this.generateRandomHex();
    const base = tinycolor(baseHex);
    let colors: tinycolor.Instance[] = [];

    switch (mode) {
      case 'complementary':
        colors = [base, base.complement()];
        break;
      case 'analogous':
        colors = base.analogous(count);
        break;
      case 'triadic':
        colors = base.triad();
        break;
      case 'tetradic':
        colors = base.tetrad();
        break;
      default:
        colors = Array(count)
          .fill(null)
          .map(() => tinycolor(this.generateRandomHex()));
    }

    // Ensure we have exactly the requested number of colors
    while (colors.length < count) {
      colors.push(tinycolor(this.generateRandomHex()));
    }
    colors = colors.slice(0, count);

    return colors.map((color) => this.convertToColorObject(color.toHexString()));
  }
}
