<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type {
	CardOptions,
	ColorData,
	GradientColor,
	SolidColor,
} from "@/types/colors";
import {
	ArrowRight,
	Brush,
	Code,
	Github,
	Instagram,
	Layers,
	Palette,
	Star,
	Twitter,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";

// State Management
const colorData = ref<ColorData | null>(null);
const options = ref<CardOptions>({
	opacity: 1,
	direction: "linear",
	angle: 90,
});
const backgroundStyle = ref<{ background?: string; backgroundColor?: string }>(
	{},
);

// Helper Functions
onMounted(() => {
	const params = new URLSearchParams(window.location.search);
	const type = params.get("type");
	const opacity = Number.parseFloat(params.get("opacity") || "1");
	const name = params.get("name") || "";

	if (type === "gradient") {
		const colors = JSON.parse(params.get("colors") || "[]");
		const directionParam = params.get("direction") || "linear";
		const direction =
			directionParam === "linear" ||
			directionParam === "radial" ||
			directionParam === "conic"
				? directionParam
				: "linear";
		const angle = Number.parseInt(params.get("angle") || "90");

		colorData.value = { name, colors } as GradientColor;
		options.value = { opacity, direction, angle };

		const colorStops = colors
			.map((color: string) => {
				const rgbColor = color
					.replace(/rgba?\(([^)]+)\)/, "rgb($1)")
					.replace(/,\s*[\d.]+\s*\)/, ")");
				return rgbColor
					.replace("rgb(", "rgba(")
					.replace(")", `, ${opacity})`);
			})
			.join(", ");

		if (direction === "linear") {
			backgroundStyle.value = {
				background: `linear-gradient(${angle}deg, ${colorStops})`,
			};
		} else if (direction === "radial") {
			backgroundStyle.value = {
				background: `radial-gradient(circle, ${colorStops})`,
			};
		} else {
			backgroundStyle.value = {
				background: `conic-gradient(${colorStops})`,
			};
		}
	} else {
		const color = params.get("color") || "";
		colorData.value = { name, color } as SolidColor;
		backgroundStyle.value = {
			backgroundColor: color
				.replace("rgb", "rgba")
				.replace(")", `, ${opacity})`),
		};
	}
});

// Features Data
const features = ref([
	{
		title: "Color System Design",
		description:
			"Create cohesive color palettes that align with your brand identity and enhance user experience.",
		icon: Palette,
	},
	{
		title: "Design Tokens",
		description:
			"Manage design tokens efficiently for consistent styling across your applications.",
		icon: Brush,
	},
	{
		title: "Component Library",
		description:
			"Access a comprehensive library of pre-styled components using your color system.",
		icon: Layers,
	},
	{
		title: "Code Generation",
		description:
			"Automatically generate CSS variables and utility classes for your color system.",
		icon: Code,
	},
]);

// Services Data
const services = ref([
	{
		title: "Brand Color Analysis",
		description:
			"Get expert analysis of your brand colors and recommendations for improvement.",
		price: "$299/month",
	},
	{
		title: "Custom Palette Creation",
		description:
			"Work with our design team to create a unique color palette for your brand.",
		price: "$499/month",
	},
	{
		title: "Design System Implementation",
		description:
			"Full implementation of your color system across your digital products.",
		price: "$999/month",
	},
	{
		title: "Ongoing Consultation",
		description:
			"Regular reviews and updates to keep your color system current.",
		price: "$199/month",
	},
]);

// Statistics Data
const statistics = ref([
	{ value: "98%", label: "Client Satisfaction" },
	{ value: "500+", label: "Projects Completed" },
	{ value: "50K+", label: "Color Palettes Generated" },
	{ value: "100+", label: "Enterprise Clients" },
]);

// Testimonials Data
const testimonials = ref([
	{
		name: "Sarah Chen",
		position: "Lead Designer at TechCorp",
		avatar: "SC",
		text: "The color system transformed our design workflow. We've seen a 40% increase in design consistency across teams.",
	},
	{
		name: "Marcus Rodriguez",
		position: "Creative Director",
		avatar: "MR",
		text: "Implementing this color system cut our design decision time in half. The results are stunning.",
	},
	{
		name: "Emily Parker",
		position: "UI/UX Designer",
		avatar: "EP",
		text: "The best color management tool I've used. It's intuitive and the results are always on point.",
	},
]);
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <section class="pt-32 pb-20 relative overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <h1 class="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Design with
              <span :style="{
                background: backgroundStyle.background || backgroundStyle.backgroundColor,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }">
                Perfect Colors
              </span>
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">
              Experience how this color scheme can elevate your design system and create stunning user interfaces.
            </p>
            <div class="flex space-x-4">
              <Button size="lg" :style="backgroundStyle" class="text-background">
                Get Started
                <ArrowRight class="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          <div class="relative">
            <div class="aspect-square rounded-2xl overflow-hidden" :style="backgroundStyle">
              <div class="absolute inset-0 grid grid-cols-2 gap-4 p-8">
                <div class="bg-white/20 rounded-lg backdrop-blur-sm"></div>
                <div class="bg-white/10 rounded-lg backdrop-blur-sm translate-y-8"></div>
                <div class="bg-white/30 rounded-lg backdrop-blur-sm -translate-y-4"></div>
                <div class="bg-white/20 rounded-lg backdrop-blur-sm translate-y-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Features</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Discover our powerful features</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="feature in features" :key="feature.title" class="hover:shadow-xl transition-all">
            <CardContent class="p-6">
              <component :is="feature.icon" class="w-12 h-12 mb-4"
                :style="{ color: backgroundStyle.backgroundColor }" />
              <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ feature.description }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="showcase" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Services</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">Professional solutions for your needs</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card v-for="service in services" :key="service.title" class="hover:shadow-xl transition-all">
            <CardContent class="p-6">
              <div class="w-12 h-12 rounded-full mb-4" :style="backgroundStyle"></div>
              <h3 class="text-xl font-bold mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ service.description }}</p>
              <p class="font-bold text-lg" :style="{ color: backgroundStyle.backgroundColor }">
                {{ service.price }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in statistics" :key="stat.label" class="text-center">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              :style="{ ...backgroundStyle, opacity: 0.1 }">
              <div class="w-16 h-16 rounded-full" :style="backgroundStyle"></div>
            </div>
            <h3 class="text-4xl font-bold mb-2">{{ stat.value }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="components" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Testimonials</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">What our clients say</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card v-for="testimonial in testimonials" :key="testimonial.name" class="hover:shadow-xl transition-all">
            <CardContent class="p-6">
              <div class="flex items-center mb-6">
                <Avatar class="h-12 w-12">
                  <AvatarFallback :style="backgroundStyle">{{ testimonial.avatar }}</AvatarFallback>
                </Avatar>
                <div class="ml-4">
                  <h4 class="font-bold">{{ testimonial.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ testimonial.position }}</p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-300 mb-4">"{{ testimonial.text }}"</p>
              <div class="flex space-x-1">
                <Star v-for="i in 5" :key="i" class="w-5 h-5" :style="{ color: backgroundStyle.backgroundColor }" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="py-20 relative overflow-hidden">
      <div class="absolute inset-0" :style="backgroundStyle"></div>
      <div class="container mx-auto px-4 relative">
        <Card class="max-w-3xl mx-auto backdrop-blur-lg bg-background/90">
          <CardContent class="p-12 text-center">
            <h2 class="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p class="text-xl mb-8">Transform your design system with our color palette</p>
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="default" class="bg-primary text-background hover:bg-white/90">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" class="border-border text-foreground hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 rounded-full" :style="backgroundStyle"></div>
              <span class="font-bold text-xl">Color Preview</span>
            </div>
            <p class="text-gray-600 dark:text-gray-300">Elevate your design system with our color palette solutions.</p>
          </div>

          <div v-for="i in 3" :key="i">
            <h4 class="font-bold mb-4">Category {{ i }}</h4>
            <ul class="space-y-2">
              <li v-for="j in 4" :key="j">
                <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Link
                  {{ j }}</a>
              </li>
            </ul>
          </div>
        </div>

        <Separator class="my-8" />

        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">© 2024 Color Preview. All rights reserved.</p>
          <div class="flex space-x-4">
            <Button :variant="'outline'" :size="'icon'" class="cursor-pointer hover:cursor-pointer"
              :style="{ cursor: 'pointer' }">
              <Twitter class="h-5 w-5" :style="{ color: backgroundStyle.backgroundColor }" />
            </Button>
            <Button :variant="'outline'" :size="'icon'" class="cursor-pointer hover:cursor-pointer"
              :style="{ cursor: 'pointer' }">
              <Github class="h-5 w-5" :style="{ color: backgroundStyle.backgroundColor }" />
            </Button>
            <Button :variant="'outline'" :size="'icon'" class="cursor-pointer hover:cursor-pointer"
              :style="{ cursor: 'pointer' }">
              <Instagram class="h-5 w-5" :style="{ color: backgroundStyle.backgroundColor }" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
