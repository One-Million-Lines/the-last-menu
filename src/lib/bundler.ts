import type { MenuConfig } from "@/types/menu";
import { LAST_MENU_JS } from "./lastMenuSource";
import { THEMES } from "./themeSource";

export function buildBundle(config: MenuConfig): string {
  const themeCSS = THEMES[config.theme] || THEMES.minimal;
  const configJson = JSON.stringify(config);

  return `(function(){
"use strict";
var s=document.createElement("style");s.textContent=${JSON.stringify(themeCSS)};document.head.appendChild(s);
${LAST_MENU_JS}
LastMenu.init(${configJson});
})();`;
}

export function downloadFile(content: string, filename: string, mime = "application/javascript") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJson(config: MenuConfig) {
  const json = JSON.stringify(config, null, 2);
  downloadFile(json, "last-menu-config.json", "application/json");
}

export function downloadBundle(config: MenuConfig) {
  const bundle = buildBundle(config);
  downloadFile(bundle, "last-menu-bundle.js", "application/javascript");
}
