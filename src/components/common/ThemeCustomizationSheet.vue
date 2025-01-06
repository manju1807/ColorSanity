<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FONT_FAMILIES, THEME_PRESETS } from "@/config/constants/themes";
import { useThemeStore } from "@/stores/theme-store";
import type { PresetTheme } from "@/types/themes";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Paintbrush, RotateCcw, Sun } from "lucide-vue-next";
import { computed } from "vue";

const themeStore = useThemeStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const currentRadius = computed(() => themeStore.currentRadius);
const currentBorderWidth = computed(() => themeStore.currentBorderWidth);
const currentFontFamily = computed(() => themeStore.currentFontFamily);
const currentColors = computed(() => themeStore.currentColors);

const presets = Object.keys(THEME_PRESETS) as PresetTheme[];
const fontFamilyOptions = Object.keys(FONT_FAMILIES);

const handleColorChange = (colorKey: string, value: string) => {
  themeStore.updateColors(
    { [colorKey]: value },
    isDark.value ? "dark" : "light",
  );
};

const handleReset = () => themeStore.resetTheme();
const handleRadiusChange = (value: number[] | undefined) => {
  if (value?.[0] !== undefined) themeStore.updateRadius(value[0]);
};
const handleBorderWidthChange = (value: number[] | undefined) => {
  if (value?.[0] !== undefined) themeStore.updateBorderWidth(value[0]);
};
const handleFontFamilyChange = (value: string) => {
  if (fontFamilyOptions.includes(value)) themeStore.updateFontFamily(value);
};
const handlePresetChange = (preset: PresetTheme) => {
  themeStore.applyPreset(preset);
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium">Customize Theme</h3>
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" @click="toggleDark()" aria-label="Toggle dark mode">
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" @click="handleReset" aria-label="Reset theme"
          class="group flex items-center gap-2 bg-card border px-2 py-1.5" :style="{
            borderRadius: `${currentRadius}rem`,
            borderWidth: `${currentBorderWidth}px`,
          }">
          <RotateCcw class="h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>Reset</span>
        </Button>
      </div>
    </div>

    <Tabs default-value="colors" class="space-y-4">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="fonts">Fonts</TabsTrigger>
        <TabsTrigger value="border">Border</TabsTrigger>
      </TabsList>

      <TabsContent value="colors" class="space-y-4">
        <div class="space-y-4">
          <div>
            <Label>Color Presets</Label>
            <div class="mt-2 grid grid-cols-3 gap-2">
              <Button v-for="preset in presets" :key="preset" variant="outline" size="sm"
                class="gap-2 px-2 py-1.5 flex flex-row items-center w-full justify-start text-sm border" :style="{
                  borderRadius: `${currentRadius}rem`,
                  borderWidth: `${currentBorderWidth}px`,
                }" @click="handlePresetChange(preset)">
                <div class="h-4 w-4 rounded-full" :style="{
                  backgroundColor: `hsl(${THEME_PRESETS[preset][isDark ? 'dark' : 'light'].primary
                    })`,
                }" />
                <span>{{ preset }}</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Color Adjustments</CardTitle>
              <CardDescription>Fine-tune your theme colors</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div v-for="(value, key) in currentColors" :key="key" class="grid gap-2">
                <Label class="flex items-center justify-between">
                  {{ key }}
                  <span class="text-xs text-muted-foreground">hsl({{ value }})</span>
                </Label>
                <div class="flex gap-2">
                  <div class="h-8 flex-1 rounded-md border border-border"
                    :style="{ backgroundColor: `hsl(${value})` }" />
                  <Button variant="outline" size="sm" class="shrink-0" @click="handleColorChange(key, value)"
                    aria-label="Edit color">
                    <Paintbrush class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="fonts" class="space-y-4">
        <div class="space-y-4">
          <div>
            <Label>Font Family</Label>
            <Select :model-value="currentFontFamily" @update:model-value="handleFontFamilyChange">
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="font in fontFamilyOptions" :key="font" :value="font">
                  {{ font }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-2xl font-semibold">
                The quick brown fox jumps over the lazy dog
              </p>
              <p class="text-sm text-muted-foreground">
                Font: {{ currentFontFamily }}
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="border" class="space-y-4">
        <div class="space-y-4">
          <div>
            <Label class="flex items-center justify-between">
              Border Radius
              <span class="text-sm text-muted-foreground">{{ currentRadius }}rem</span>
            </Label>
            <Slider :model-value="[currentRadius]" :min="0" :max="2" :step="0.1" class="mt-2"
              @update:model-value="handleRadiusChange" />
          </div>

          <div>
            <Label class="flex items-center justify-between">
              Border Width
              <span class="text-sm text-muted-foreground">{{ currentBorderWidth }}px</span>
            </Label>
            <Slider :model-value="[currentBorderWidth]" :min="0" :max="4" :step="1" class="mt-2"
              @update:model-value="handleBorderWidthChange" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="relative aspect-video rounded-lg border border-border bg-muted" :style="{
                  borderRadius: `${currentRadius}rem`,
                  borderWidth: `${currentBorderWidth}px`,
                }">
                  <div class="absolute inset-4 rounded border border-border bg-popover" />
                </div>
                <div class="grid gap-2">
                  <div class="rounded-lg border border-border bg-muted p-4" :style="{
                    borderRadius: `${currentRadius}rem`,
                    borderWidth: `${currentBorderWidth}px`,
                  }" />
                  <div class="rounded-lg border border-border bg-muted p-4" :style="{
                    borderRadius: `${currentRadius}rem`,
                    borderWidth: `${currentBorderWidth}px`,
                  }" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
