import tinycolor from "tinycolor2";
import type { ColorInfo } from "../types/colorPallete";

// services/AccessibilityService.ts
export class AccessibilityService {
  /**
   * Checks the contrast ratio between two colors.
   * @param color1 - The first color.
   * @param color2 - The second color.
   * @returns The contrast ratio between the two colors.
   */
  public checkContrast(color1: string, color2: string): number {
    const c1 = tinycolor(color1);
    const c2 = tinycolor(color2);
    return tinycolor.readability(c1, c2);
  }

  /**
   * Checks if the contrast between two colors meets WCAG compliance.
   * @param backgroundColor - The background color.
   * @param textColor - The text color.
   * @param level - The WCAG compliance level ('AA' or 'AAA').
   * @returns A boolean indicating whether the contrast is compliant.
   */
  public isWCAGCompliant(
    backgroundColor: string,
    textColor: string,
    level: 'AA' | 'AAA' = 'AA'
  ): boolean {
    const ratio = this.checkContrast(backgroundColor, textColor);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }

  /**
   * Simulates color blindness for a given color.
   * @param color - The color to simulate.
   * @param type - The type of color blindness to simulate.
   * @returns The simulated color.
   */
  public simulateColorBlindness(color: string, type: 'protanopia' | 'deuteranopia' | 'tritanopia'): string {
    // Implement color blindness simulation
    switch (type) {
      case 'protanopia':
        // Simulate protanopia
        return color; // Replace with actual simulation logic
      case 'deuteranopia':
        // Simulate deuteranopia
        return color; // Replace with actual simulation logic
      case 'tritanopia':
        // Simulate tritanopia
        return color; // Replace with actual simulation logic
      default:
        return color;
    }
  }

  /**
   * Ensures that the generated color palette is accessible.
   * @param colors - The array of colors to check and adjust.
   * @returns A promise resolving to an array of accessible colors.
   */
  public async ensureAccessibility(colors: ColorInfo[]): Promise<ColorInfo[]> {
    const accessibleColors = await Promise.all(
      colors.map(async (color) => {
        const isAccessible = this.isWCAGCompliant('#ffffff', color.hex, 'AA');
        if (!isAccessible) {
          const adjusted = this.adjustColorForAccessibility(color.hex);
          const adjustedColor = tinycolor(adjusted);
          return {
            hex: adjustedColor.toHexString(),
            name: color.name,
            rgb: adjustedColor.toRgbString(),
            hsl: adjustedColor.toHslString(),
            value: adjustedColor.toHexString(),
            toString: () => adjustedColor.toHexString()
          };
        }
        return color;
      })
    );
    return accessibleColors;
  }

  /**
   * Adjusts a color to make it accessible.
   * @param color - The color to adjust.
   * @returns The adjusted color.
   */
  private adjustColorForAccessibility(color: string): string {
    const colorInstance = tinycolor(color);
    // Lighten or darken the color to improve contrast
    if (colorInstance.getBrightness() > 128) {
      return colorInstance.darken(20).toString();
    } else {
      return colorInstance.lighten(20).toString();
    }
  }
}
