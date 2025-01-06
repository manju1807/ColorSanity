<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "../stores/theme-store";
defineOptions({
	name: "HomeView",
});
const themeStore = useThemeStore();
const currentRadius = computed(() => themeStore.currentRadius);
const currentBorderWidth = computed(() => themeStore.currentBorderWidth);
const innerBorderRadius = computed(() => themeStore.currentRadius * 0.75);
</script>

<template>
  <div class="bg-background text-foreground">
    <!-- Hero Section -->
    <section
      class="container min-h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-b from-background/10 to-background">
      <h1 class="text-6xl font-semibold tracking-tight leading-tight max-w-3xl mb-4">
        Create Stunning Color Palettes with <span class="text-primary">ColorSanity</span>
      </h1>
      <p class="text-md text-muted-foreground mb-8 max-w-2xl">
        Generate, customize, and explore beautiful colors, gradients, and CSS code snippets. Perfect for designers,
        developers, and creatives.
      </p>
      <div class="flex space-x-4">
        <router-link to="/color-palettes"
          class="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Get Started
        </router-link>
        <router-link to="/collections"
          class="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors">
          Explore Collections
        </router-link>
      </div>
      <!-- 3D Visual Placeholder -->
      <div
        class="mt-12 w-full max-w-4xl h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center">
        <span class="text-white text-2xl">3D Visual Here</span>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container py-16 px-8">
      <h2 class="text-4xl font-bold text-center mb-12">Features</h2>
      <div class="grid grid-cols-4 gap-4 max-w-7xl mx-auto">
        <!-- Color Palette Generator -->
        <div
          class="col-span-2 row-span-2 bg-card border border-border/40 hover:border-border p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-2xl font-semibold mb-4">Color Palette Generator</h3>
          <p class="text-muted-foreground mb-4">Create custom color palettes with ease. Perfect for branding and design
            projects.</p>
          <div class="mt-auto flex gap-2">
            <div class="h-8 w-8 rounded-full bg-primary" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-8 w-8 rounded-full bg-secondary" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-8 w-8 rounded-full bg-accent" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
          </div>
        </div>

        <!-- Gradient Generator -->
        <div class="bg-card border border-border/40 hover:border-border p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-xl font-semibold mb-4">Gradient Generator</h3>
          <p class="text-sm text-muted-foreground">Generate stunning gradients for your designs.</p>
          <div class="mt-4 h-16 bg-gradient-to-r from-purple-500 to-pink-500"
            :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
        </div>

        <!-- Tints & Shades -->
        <div class="bg-card border border-border/40 hover:border-border p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-xl font-semibold mb-4">Tints & Shades</h3>
          <p class="text-sm text-muted-foreground">Explore color variations.</p>
          <div class="mt-4 flex gap-2">
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgb(var(--primary) / 0.2)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgb(var(--primary) / 0.4)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgb(var(--primary) / 0.6)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgb(var(--primary) / 0.8)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgb(var(--primary))' }"></div>
          </div>
        </div>

        <!-- CSS Code Export -->
        <div class="bg-card border border-border/40 hover:border-border p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-xl font-semibold mb-4">CSS Code Export</h3>
          <p class="text-sm text-muted-foreground">Copy code with one click.</p>
          <div class="mt-4 font-mono text-xs bg-muted p-2" :style="{ borderRadius: `${innerBorderRadius}rem` }">
            background: linear-gradient(...)
          </div>
        </div>

        <!-- Collections -->
        <div class="col-span-2 bg-card border border-border/40 hover:border-border p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-xl font-semibold mb-4">Curated Collections</h3>
          <p class="text-sm text-muted-foreground">Browse our handpicked color schemes.</p>
          <div class="mt-4 grid grid-cols-5 gap-2">
            <div class="h-12 bg-red-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-blue-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-green-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-yellow-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-purple-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- Collections Section -->
    <section class="py-16 px-8 bg-gradient-to-b from-background to-primary/10">
      <h2 class="text-4xl font-bold text-center mb-12">Explore Collections</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-card p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4">Solid Colors</h3>
          <p class="text-muted-foreground">
            Browse our curated collection of solid colors for your projects.
          </p>
        </div>
        <div class="bg-card p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4">Gradients</h3>
          <p class="text-muted-foreground">
            Discover beautiful gradients to elevate your designs.
          </p>
        </div>
        <div class="bg-card p-6 rounded-lg shadow-md">
          <h3 class="text-2xl font-semibold mb-4">Tints & Shades</h3>
          <p class="text-muted-foreground">
            Explore tints and shades for any color in our collection.
          </p>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 px-8">
      <h2 class="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-card p-6 rounded-lg shadow-md">
          <p class="text-muted-foreground mb-4">
            "ColorSanity has completely transformed my design workflow. The gradient generator is a game-changer!"
          </p>
          <div class="flex items-center space-x-4">
            <div class="h-10 w-10 bg-primary rounded-full"></div>
            <div>
              <p class="font-semibold">John Doe</p>
              <p class="text-sm text-muted-foreground">UI/UX Designer</p>
            </div>
          </div>
        </div>
        <div class="bg-card p-6 rounded-lg shadow-md">
          <p class="text-muted-foreground mb-4">
            "I love how easy it is to generate and customize color palettes. Highly recommend!"
          </p>
          <div class="flex items-center space-x-4">
            <div class="h-10 w-10 bg-primary rounded-full"></div>
            <div>
              <p class="font-semibold">Jane Smith</p>
              <p class="text-sm text-muted-foreground">Frontend Developer</p>
            </div>
          </div>
        </div>
        <div class="bg-card p-6 rounded-lg shadow-md">
          <p class="text-muted-foreground mb-4">
            "The tints and shades feature is a lifesaver for creating cohesive designs."
          </p>
          <div class="flex items-center space-x-4">
            <div class="h-10 w-10 bg-primary rounded-full"></div>
            <div>
              <p class="font-semibold">Alex Johnson</p>
              <p class="text-sm text-muted-foreground">Graphic Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-background text-muted-foreground py-16 px-8">
      <div class="text-center">
        <p class="text-sm">
          ©{{ new Date().getFullYear() }} ColorSanity. Made with ❤️ by Manjunath R
        </p>
      </div>
    </footer>
  </div>
</template>
