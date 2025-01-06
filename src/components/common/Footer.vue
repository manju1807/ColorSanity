<script setup lang="ts">
import { GithubIcon, Linkedin } from "lucide-vue-next";
import IconLogo from "../icons/IconLogo.vue";

interface Column {
	title: string;
	items: { name: string; link: string }[];
}

const mainColumns: Column[] = [
	{
		title: "Features",
		items: [
			{ name: "Color Palette Generator", link: "/color-palettes" },
			{ name: "Gradient Generator", link: "/collections" },
			{ name: "Tints & Shades", link: "/tints" },
			{ name: "Real-Time Preview", link: "/preview" },
		],
	},
	{
		title: "Collections",
		items: [
			{ name: "Solid Colors", link: "/collections" },
			{ name: "Gradients", link: "/collections" },
			{ name: "Tints & Shades", link: "/tints" },
			{ name: "Custom Palettes", link: "/color-palettes" },
		],
	},
	{
		title: "Resources",
		items: [
			{ name: "Blog", link: "#" },
			{ name: "Documentation", link: "#" },
			{ name: "Changelog", link: "#" },
			{ name: "Privacy Policy", link: "#" },
			{ name: "Terms of Service", link: "#" },
		],
	},
];

defineOptions({
	name: "AppFooter",
});
</script>

<template>
  <footer class="bg-background text-muted-foreground py-16 relative z-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand Section -->
        <div>
          <div class="flex items-center mb-6 space-x-2">
            <IconLogo />
            <span class="text-xl font-semibold text-foreground tracking-tight">ColorSanity</span>
          </div>
          <p class="mb-6">
            Create, customize, and explore stunning color palettes, gradients, and CSS code snippets. Perfect for
            designers, developers, and creatives.
          </p>
          <router-link to="/color-palettes"
            class="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Get Started Now
          </router-link>
        </div>

        <!-- Feature Links -->
        <template v-for="(col, idx) in mainColumns" :key="idx">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-foreground">{{ col.title }}</h3>
            <ul>
              <li v-for="(item, i) in col.items" :key="i" class="mb-2">
                <router-link :to="item.link" class="hover:text-foreground transition-colors">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <!-- Bottom Section -->
      <div class="mt-16 pt-8 border-t border-border">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Social Media Links -->
          <div class="flex space-x-6 mb-4 md:mb-0">
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              <Linkedin
                class="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out cursor-pointer" />
            </a>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <GithubIcon
                class="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out cursor-pointer" />
            </a>
          </div>

          <!-- Copyright -->
          <div class="text-sm">
            ©{{ new Date().getFullYear() }} ColorSanity. Made with ❤️ by Manjunath R
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
