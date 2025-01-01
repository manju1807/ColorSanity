<script setup lang="ts">
import { GithubIcon, Linkedin } from "lucide-vue-next";
import IconLogo from "../icons/IconLogo.vue";

interface Column {
	title: string;
	items: string[];
}

const mainColumns: Column[] = [
	{
		title: "Main Tools",
		items: [
			"Social Media Editor",
			"Geometric Patterns Generator",
			"Seamless Patterns Generator",
			"Mesh Gradients Generator",
			"API Docs",
		],
	},
	{
		title: "Free Generator Tools",
		items: [
			"CSS Patterns",
			"Blob Generator",
			"SVG Wave Generator",
			"SVG Chart Generator",
			"SVG Doodle Backgrounds",
			"Image Noise Generator",
			"CSS Gradients Collection",
			"Free HD Wallpapers",
		],
	},
	{
		title: "Company",
		items: [
			"About",
			"Blog",
			"Changelog",
			"Privacy Policy",
			"Cookies Policy",
			"Terms",
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
        <div>
          <div class="flex items-center mb-6 space-x-2">
            <IconLogo color="hsl(var(--foreground))" />
            <span class="text-xl font-semibold text-foreground">Gradio</span>
          </div>
          <p class="mb-6">
            Create Unlimited Beautiful Backgrounds. Brand Your Product, Website, Business Uniquely.
          </p>
          <button class="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Get Started Now
          </button>
        </div>
        <template v-for="(col, idx) in mainColumns" :key="idx">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-foreground">{{ col.title }}</h3>
            <ul>
              <li v-for="(item, i) in col.items" :key="i" class="mb-2">
                <a href="#" class="hover:text-foreground transition-colors">{{ item }}</a>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <div class="mt-16 pt-8 border-t border-border">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex space-x-6 mb-4 md:mb-0">
            <Linkedin
              class="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out cursor-pointer" />
            <GithubIcon
              class="h-5 w-5 text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out cursor-pointer" />
          </div>
          <div class="text-sm">
            ©{{ new Date().getFullYear() }} Gradio. Made with ❤️ by Manjunath R
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
