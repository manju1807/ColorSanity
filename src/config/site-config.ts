interface SiteConfig {
  name: string;
  short_name: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  manifest: {
    icons: {
      favicon: string;
      appleTouchIcon: string;
      maskIcon: string;
      androidChrome: {
        small: string;
        large: string;
      };
      favicon16: string;
      favicon32: string;
    };
    webmanifest: string;
    screenshots?: {
      src: string;
      sizes: string;
      type: string;
      label: string;
    }[];
    categories?: string[];
    orientation?: string;
  };
  fonts: {
    families: string[];
    preconnect: string[];
  };
  keywords: string[];
  author: string;
}

export const siteConfig: SiteConfig = {
  name: "ColorSanity",
  short_name: "ColorSanity",
  description:
    "ColorSanity is your ultimate tool for creating, customizing, and exploring stunning color palettes, gradients, and CSS code snippets. Generate beautiful tints, solids, and gradients, preview them in real-time, and copy ready-to-use CSS code with ease. Perfect for designers, developers, and creatives looking to streamline their workflow and bring their projects to life with vibrant colors.",
  themeColor: "#ffffff",
  backgroundColor: "#ffffff",
  manifest: {
    icons: {
      favicon: "/manifests/favicon.ico",
      appleTouchIcon: "/manifests/apple-touch-icon.png",
      maskIcon: "/manifests/color-filter-sharp-svgrepo-com.svg",
      androidChrome: {
        small: "/manifests/android-chrome-192x192.png",
        large: "/manifests/android-chrome-512x512.png",
      },
      favicon16: "/manifests/favicon-16x16.png",
      favicon32: "/manifests/favicon-32x32.png",
    },
    webmanifest: "/manifests/site.webmanifest",
    screenshots: [
      {
        src: "/screenshots/screenshot1.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Home Page - Color Palette Generator",
      },
      {
        src: "/screenshots/screenshot2.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Gradient Customization Tool",
      },
    ],
    categories: ["design", "utilities", "productivity"],
    orientation: "portrait",
  },
  fonts: {
    families: [
      "Inter:wght@300;400;500;600;700",
      "Lato:wght@300;400;700",
      "Montserrat:wght@300;400;500;600;700",
      "Open+Sans:wght@300;400;500;600;700",
      "Roboto:wght@300;400;500;700",
    ],
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ],
  },
  keywords: [
    "color palette generator",
    "CSS gradient generator",
    "color tints",
    "CSS code snippets",
    "web design tools",
    "color customization",
    "PWA color tools",
    "micro-SaaS for designers",
    "real-time color preview",
    "color collections",
    "design workflow",
    "creative tools",
    "color inspiration",
    "UI/UX design",
    "frontend development",
    "color schemes",
    "web development tools",
  ],
  author: "Manjunath R",
};

export default siteConfig;
