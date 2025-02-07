// stores/colorPalette.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AccessibilityService } from '../services/AccessibilityService';
import { ColorTheoryService } from '../services/ColorTheoryService';
import { StorageService } from '../services/StorageService';
import type { ColorInfo, ColorPaletteState, ColorTheoryMode, UserPreferences } from '../types/colorPallete';

const DEFAULT_PREFERENCES: UserPreferences = {
  defaultColorCount: 5,
  preferredColorFormat: 'hex',
  autoExportFormat: 'css',
  keyboardShortcuts: {
    generate: 'space',
    undo: 'ctrl+z',
    redo: 'ctrl+shift+z',
    save: 'ctrl+s',
    export: 'ctrl+e',
  },
  maxStackSize: 50,
};

export const useColorPaletteStore = defineStore('colorPalette', () => {
  const state = ref<ColorPaletteState>({
    colors: [] as ColorInfo[],
    undoStack: [] as ColorInfo[][],
    redoStack: [] as ColorInfo[][],
    preferences: DEFAULT_PREFERENCES,
  });

  const colorTheoryService = new ColorTheoryService();
  const accessibilityService = new AccessibilityService();
  const storageService = new StorageService();

  // Getters
  const currentPalette = computed(() => state.value.colors);
  const canUndo = computed(() => state.value.undoStack.length > 0);
  const canRedo = computed(() => state.value.redoStack.length > 0);

  // Actions
  const generatePalette = async (mode: ColorTheoryMode = 'random', baseColor?: string) => {
    try {
      pushToUndoStack();
      let colors = await colorTheoryService.generatePalette(
        mode,
        state.value.preferences.defaultColorCount,
        baseColor
      );

      // Ensure the generated palette is accessible
      colors = await accessibilityService.ensureAccessibility(colors);

      state.value.colors = colors;
      state.value.redoStack = [];
      await storageService.savePaletteToHistory(state.value.colors);
    } catch (error) {
      console.error('Failed to generate palette:', error);
      throw new Error('Failed to generate palette');
    }
  };

  const pushToUndoStack = () => {
    state.value.undoStack.push([...state.value.colors]);
    if (state.value.undoStack.length > state.value.preferences.maxStackSize) {
      state.value.undoStack.shift();
    }
  };

  const undo = () => {
    if (canUndo.value) {
      state.value.redoStack.push([...state.value.colors]);
      state.value.colors = state.value.undoStack.pop()!;
    }
  };

  const redo = () => {
    if (canRedo.value) {
      state.value.undoStack.push([...state.value.colors]);
      state.value.colors = state.value.redoStack.pop()!;
    }
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    state.value.preferences = { ...state.value.preferences, ...preferences };
    storageService.savePreferences(state.value.preferences);
  };

  // Initialize store
  const initialize = async () => {
    const savedPreferences = await storageService.loadPreferences();
    if (savedPreferences) {
      state.value.preferences = { ...DEFAULT_PREFERENCES, ...savedPreferences };
    }
    await generatePalette();
  };

  return {
    state,
    currentPalette,
    canUndo,
    canRedo,
    generatePalette,
    undo,
    redo,
    updatePreferences,
    initialize,
  };
});
