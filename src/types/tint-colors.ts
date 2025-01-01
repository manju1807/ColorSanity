export interface ColorValue {
	className: string;
	rgb: string;
	hsl: string;
	hex: string;
}

export interface ColorShades {
	50: ColorValue;
	100: ColorValue;
	200: ColorValue;
	300: ColorValue;
	400: ColorValue;
	500: ColorValue;
	600: ColorValue;
	700: ColorValue;
	800: ColorValue;
	900: ColorValue;
	950: ColorValue;
}

export interface ColorPalette {
	slate: ColorShades;
	gray: ColorShades;
	zinc: ColorShades;
	neutral: ColorShades;
	stone: ColorShades;
	red: ColorShades;
	orange: ColorShades;
	amber: ColorShades;
	yellow: ColorShades;
	green: ColorShades;
	blue: ColorShades;
	indigo: ColorShades;
	violet: ColorShades;
	purple: ColorShades;
}

// Available color names in the palette
export type ColorName = keyof ColorPalette;

// Available shade numbers
export type ShadeNumber = keyof ColorShades;

// Combined color-shade string type (e.g., "blue-500")
export type ColorCombo = `${ColorName}-${ShadeNumber}`;

// Utility type to get all shades of a specific color
export type ColorShadeValues<T extends ColorName> = ColorPalette[T];

// Utility type to get a specific shade value
export type ShadeValue<
	T extends ColorName,
	S extends ShadeNumber,
> = ColorPalette[T][S];

// Type guard functions
export function isColorName(color: string): color is ColorName {
	const validColors: ColorName[] = [
		"slate",
		"gray",
		"zinc",
		"neutral",
		"stone",
		"red",
		"orange",
		"amber",
		"yellow",
		"green",
		"blue",
		"indigo",
		"violet",
		"purple",
	];
	return validColors.includes(color as ColorName);
}

export function isShadeNumber(shade: number | string): shade is ShadeNumber {
	const validShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
	return validShades.includes(Number(shade));
}

export function isValidColorCombo(
	colorCombo: string,
): colorCombo is ColorCombo {
	const [color, shade] = colorCombo.split("-");
	return isColorName(color) && isShadeNumber(shade);
}

// Utility function to get tailwind class name
export function getColorClassName(
	color: ColorName,
	shade: ShadeNumber,
): string {
	return `bg-${color}-${shade}`;
}

// Constants
export const DEFAULT_SHADE: ShadeNumber = 500;
export const DEFAULT_COLOR: ColorName = "blue";

// Types for theme configuration
export interface ColorConfig {
	primary: ColorCombo;
	secondary: ColorCombo;
	accent: ColorCombo;
	background: ColorCombo;
	text: ColorCombo;
}
