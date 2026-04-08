import { create } from "zustand";
import type { MenuConfig } from "@/types/menu";
import { DEFAULT_MENU_CONFIG } from "@/types/menu";

interface MenuStore {
  config: MenuConfig;
  jsonText: string;
  jsonError: string | null;
  setConfig: (config: MenuConfig) => void;
  setJsonText: (text: string) => void;
  loadFromJson: (text: string) => boolean;
}

export const useMenuStore = create<MenuStore>((set) => ({
  config: DEFAULT_MENU_CONFIG,
  jsonText: JSON.stringify(DEFAULT_MENU_CONFIG, null, 2),
  jsonError: null,

  setConfig: (config) =>
    set({
      config,
      jsonText: JSON.stringify(config, null, 2),
      jsonError: null,
    }),

  setJsonText: (text) => {
    try {
      const parsed = JSON.parse(text);
      set({ jsonText: text, config: parsed, jsonError: null });
    } catch (e: any) {
      set({ jsonText: text, jsonError: e.message });
    }
  },

  loadFromJson: (text) => {
    try {
      const parsed = JSON.parse(text);
      set({ config: parsed, jsonText: JSON.stringify(parsed, null, 2), jsonError: null });
      return true;
    } catch {
      return false;
    }
  },
}));
