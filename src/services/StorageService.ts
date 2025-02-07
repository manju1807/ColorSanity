// services/StorageService.ts
import type { Color, SavedPalette, UserPreferences } from '../types/colorPallete';

export class StorageService {
  private readonly PREFERENCES_KEY = 'color-palette-preferences';
  private readonly HISTORY_KEY = 'color-palette-history';

  public async savePreferences(preferences: UserPreferences): Promise<void> {
    try {
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  public async loadPreferences(): Promise<UserPreferences | null> {
    try {
      const saved = localStorage.getItem(this.PREFERENCES_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  }

  public async savePaletteToHistory(colors: Color[]): Promise<void> {
    try {
      const history = await this.loadPaletteHistory();
      const newPalette: SavedPalette = {
        colors,
        name: `Palette ${history.length + 1}`,
        created: new Date(),
        tags: [],
      };
      history.unshift(newPalette);
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
    } catch (error) {
      console.error('Failed to save palette to history:', error);
    }
  }

  public async loadPaletteHistory(): Promise<SavedPalette[]> {
    try {
      const saved = localStorage.getItem(this.HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load palette history:', error);
      return [];
    }
  }
}
