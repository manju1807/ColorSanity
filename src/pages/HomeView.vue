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
      class="container min-h-screen flex flex-col justify-center items-center text-center p-4 md:p-8 bg-gradient-to-b from-background/10 to-background">
      <h1 class="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-3xl mb-4">
        Create Stunning Color Palettes with <span class="text-primary">ColorSanity</span>
      </h1>
      <p class="text-sm md:text-md text-muted-foreground mb-8 max-w-2xl">
        Generate, customize, and explore beautiful colors, gradients, and CSS code snippets. Perfect for designers,
        developers, and creatives.
      </p>
      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
        class="mt-12 w-full max-w-4xl h-64 md:h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-2xl flex items-center justify-center">
        <span class="text-white text-xl md:text-2xl">3D Visual Here</span>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container py-8 md:py-16 px-4 md:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 max-w-7xl mx-auto">
        <!-- Color Palette Generator -->
        <div
          class="md:col-span-2 md:row-span-2 bg-card border border-border/40 hover:border-border p-6 md:p-8 hover:shadow-xl transition-all relative overflow-clip"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-xl md:text-2xl font-semibold mb-4">Color Palette Generator</h3>
          <p class="text-sm md:text-md text-muted-foreground mb-4">Create custom color palettes with ease. Perfect for
            branding and design projects.</p>
          <div class="mt-auto flex gap-2">
            <div class="h-8 w-8 rounded-full bg-primary" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-8 w-8 rounded-full bg-secondary" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-8 w-8 rounded-full bg-accent" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
          </div>
          <div class="absolute -right-24 bottom-30 h-20 w-full">
            <img v-bind:src="'https://cssgradient.io/images/shades/color-shades-9de2a05b.svg'" alt="">
          </div>
        </div>

        <!-- Gradient Generator -->
        <div class="bg-card border border-border/40 hover:border-border p-6 md:p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-lg md:text-xl font-semibold mb-4">Gradient Generator</h3>
          <p class="text-sm text-muted-foreground">Generate stunning gradients for your designs.</p>
          <div class="mt-4 h-16 bg-gradient-to-r from-purple-500 to-pink-500"
            :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
        </div>

        <!-- Tints & Shades -->
        <div class="bg-card border border-border/40 hover:border-border p-6 md:p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-lg md:text-xl font-semibold mb-4">Tints & Shades</h3>
          <p class="text-sm text-muted-foreground">Explore color variations.</p>
          <div class="mt-4 flex flex-row gap-2">
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgba(71, 85, 105,0.2)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgba(71, 85, 105,0.4)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgba(71, 85, 105,0.6)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgba(71, 85, 105,0.8)' }"></div>
            <div class="h-16 w-4"
              :style="{ borderRadius: `${innerBorderRadius}rem`, backgroundColor: 'rgba(71, 85, 105,1.0)' }"></div>
          </div>
        </div>

        <!-- CSS Code Export -->
        <div class="bg-card border border-border/40 hover:border-border p-6 md:p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-lg md:text-xl font-semibold mb-4">CSS Code Export</h3>
          <p class="text-sm text-muted-foreground">Copy code with one click.</p>
          <div class="mt-4 font-mono text-xs bg-muted p-2" :style="{ borderRadius: `${innerBorderRadius}rem` }">
            background: linear-gradient(...)
          </div>
        </div>

        <!-- Collections -->
        <div class="bg-card border border-border/40 hover:border-border p-6 md:p-8 hover:shadow-xl transition-all"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <h3 class="text-lg md:text-xl font-semibold mb-4">Curated Collections</h3>
          <p class="text-sm text-muted-foreground">Browse our handpicked color schemes.</p>
          <div class="mt-4 grid grid-cols-5 gap-2">
            <div class="h-12 bg-slate-600" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-emerald-500" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-amber-400" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-rose-400" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
            <div class="h-12 bg-sky-400" :style="{ borderRadius: `${innerBorderRadius}rem` }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collections Section -->
    <section class="container py-8 md:py-16 px-4 md:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Explore Collections</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- Solid Colors Card -->
        <div
          class="bg-card border border-border/40 hover:border-border p-6 rounded-lg hover:shadow-xl transition-all relative overflow-clip flex flex-col"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <div class="flex flex-col items-center text-center flex-grow">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-foreground" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-4">Solid Colors</h3>
            <p class="text-sm md:text-md text-muted-foreground mb-6">Explore our handpicked color palette.</p>
            <!-- Solid Colors Sample -->
            <div class="flex gap-2 mb-6">
              <div class="w-8 h-8 bg-red-500 rounded"></div>
              <div class="w-8 h-8 bg-blue-500 rounded"></div>
              <div class="w-8 h-8 bg-green-500 rounded"></div>
            </div>
          </div>
          <router-link to="/collections" class="text-primary hover:text-primary/80 transition-colors mt-auto">Explore
            →</router-link>
        </div>
        <!-- Gradients Card -->
        <div
          class="bg-card border border-border/40 hover:border-border p-6 rounded-lg hover:shadow-xl transition-all relative overflow-clip flex flex-col"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <div class="flex flex-col items-center text-center flex-grow">
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-4">Gradients</h3>
            <p class="text-sm md:text-md text-muted-foreground mb-6">Discover beautiful gradients to elevate your
              designs.</p>
            <!-- Gradients Sample -->
            <div class="flex flex-row gap-2 mb-6 w-full">
              <div class="w-full h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              <div class="w-full h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded"></div>
              <div class="w-full h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded"></div>
            </div>
          </div>
          <router-link to="/collections" class="text-primary hover:text-primary/80 transition-colors mt-auto">Explore
            →</router-link>
        </div>
        <!-- Tints & Shades Card -->
        <div
          class="bg-card border border-border/40 hover:border-border p-6 rounded-lg hover:shadow-xl transition-all relative overflow-clip flex flex-col"
          :style="{ borderRadius: `${currentRadius}rem`, borderWidth: `${currentBorderWidth}px` }">
          <div class="flex flex-col items-center text-center flex-grow">
            <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-foreground" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-4">Tints & Shades</h3>
            <p class="text-sm md:text-md text-muted-foreground mb-6">Explore tints and shades for any color in our
              collection.</p>
            <!-- Tints & Shades Sample -->
            <div class="flex flex-row gap-2 mb-6 w-full">
              <div class="w-full h-8 bg-blue-100 rounded"></div>
              <div class="w-full h-8 bg-blue-300 rounded"></div>
              <div class="w-full h-8 bg-blue-500 rounded"></div>
              <div class="w-full h-8 bg-blue-700 rounded"></div>
            </div>
          </div>
          <router-link to="/tints" class="text-primary hover:text-primary/80 transition-colors mt-auto">Explore
            →</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="container py-8 md:py-16 px-4 md:px-8">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">What Our Users Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div class="bg-card p-6 rounded-lg shadow-md">
          <p class="text-sm md:text-md text-muted-foreground mb-4">
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
          <p class="text-sm md:text-md text-muted-foreground mb-4">
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
          <p class="text-sm md:text-md text-muted-foreground mb-4">
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
    <footer class="bg-muted text-muted-foreground py-8 md:py-16 px-4 md:px-8">
      <div class="container mx-auto flex flex-col md:flex-row gap-6 md:gap-8 min-h-[50dvh]">
        <!-- Personal Message Section -->
        <div class="flex flex-col w-full px-4 md:px-16 justify-center">
          <h3 class="text-lg font-semibold mb-4 relative">
            <span class="z-20">Hello fellow creators!</span>
            <div class="absolute bg-primary h-2 w-32 top-4 z-0 opacity-30"></div>
          </h3>
          <p class="text-sm mb-4">
            I'm Manjunath R, the creator and developer behind the <b>ColorSanity</b>.
          </p>
          <p class="text-sm mb-4">
            For years, I struggled to craft visually appealing designs for projects, brands, and interfaces. It often
            required advanced design skills or countless hours of trial and error.
          </p>
          <p class="text-sm mb-4">
            That's why I created <b>ColorSanity</b>. My goal is to empower everyone to create professional-quality
            designs effortlessly, without needing prior design experience.
          </p>
          <p class="text-sm font-semibold">- Manjunath R</p>
        </div>

        <!-- Additional Content Section -->
        <div class="flex flex-col w-full justify-center items-center">
          <div class="h-48 w-48 md:h-60 md:w-60 rounded-xl shadow-xl border-border">
            <img class="grayscale hover:grayscale-0 transition-all duration-300 ease-in-out"
              v-bind:src="'https://manjunath18.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDP.630992a6.png&w=1080&q=100'"
              height="100%" width="100%" alt="">
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
