// @/src/config/site-config.ts

interface SiteConfig {
  name: string;
  description: string;
  themeColor: string;
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
  };
  fonts: {
    families: string[];
    preconnect: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: 'ColorSanity',
  description: 'Your application description',
  themeColor: '#ffffff',
  manifest: {
    icons: {
      favicon: '/manifests/favicon.ico',
      appleTouchIcon: '/manifests/apple-touch-icon.png',
      maskIcon: '/manifests/color-filter-sharp-svgrepo-com.svg',
      androidChrome: {
        small: '/manifests/android-chrome-192x192.png',
        large: '/manifests/android-chrome-512x512.png',
      },
      favicon16: '/manifests/favicon-16x16.png',
      favicon32: '/manifests/favicon-32x32.png',
    },
    webmanifest: '/manifests/site.webmanifest',
  },
  fonts: {
    families: [
      'Inter:wght@300;400;500;600;700',
      'Lato:wght@300;400;700',
      'Montserrat:wght@300;400;500;600;700',
      'Open+Sans:wght@300;400;500;600;700',
      'Roboto:wght@300;400;500;700'
    ],
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]
  }
};

export default siteConfig;
