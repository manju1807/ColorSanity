export interface ThemeColors {
	background: string;
	foreground: string;
	muted: string;
	"muted-foreground": string;
	popover: string;
	"popover-foreground": string;
	border: string;
	input: string;
	primary: string;
	"primary-foreground": string;
	secondary: string;
	"secondary-foreground": string;
	accent: string;
	"accent-foreground": string;
	destructive: string;
	"destructive-foreground": string;
	ring: string;
}

export interface ThemeSettings {
	radius: number;
	borderWidth: number;
	fontFamily: string;
	colors: {
		light: ThemeColors;
		dark: ThemeColors;
	};
}
export type PresetTheme =
	| "zinc"
	| "slate"
	| "stone"
	| "gray"
	| "neutral"
	| "red"
	| "rose"
	| "blue"
	| "green"
	| "orange"
	| "yellow"
	| "violet";
