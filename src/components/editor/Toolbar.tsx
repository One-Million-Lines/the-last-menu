import { useMenuStore } from "@/store/menuStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { downloadJson, downloadBundle } from "@/lib/bundler";
import { SAMPLE_CONFIGS } from "@/types/menu";
import { THEME_LIST } from "@/lib/themeSource";
import { Download, FileJson, Upload, Eye, EyeOff } from "lucide-react";
import { useRef } from "react";

export function Toolbar() {
  const { config, setConfig, loadFromJson } = useMenuStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        loadFromJson(reader.result);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const groups = THEME_LIST.reduce<Record<string, typeof THEME_LIST>>((acc, t) => {
    (acc[t.group] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap items-center gap-2 border-b bg-white px-4 py-2">
      {/* Sample presets */}
      <span className="text-xs font-medium text-muted-foreground mr-1">Presets:</span>
      {SAMPLE_CONFIGS.map((s) => (
        <Button key={s.label} variant="outline" size="sm" onClick={() => setConfig(s.config)}>
          {s.label}
        </Button>
      ))}

      <Separator orientation="vertical" className="h-6" />

      {/* Theme dropdown */}
      <span className="text-xs font-medium text-muted-foreground mr-1">Theme:</span>
      <select
        value={config.theme}
        onChange={(e) => setConfig({ ...config, theme: e.target.value })}
        className="h-8 rounded-md border border-input bg-background px-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {Object.entries(groups).map(([group, themes]) => (
          <optgroup key={group} label={group}>
            {themes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <Separator orientation="vertical" className="h-6" />

      {/* Icons toggle */}
      <Button
        variant={config.showIcons ? "default" : "outline"}
        size="sm"
        onClick={() => setConfig({ ...config, showIcons: !config.showIcons })}
      >
        {config.showIcons ? <Eye className="mr-1 h-3.5 w-3.5" /> : <EyeOff className="mr-1 h-3.5 w-3.5" />}
        Icons
      </Button>

      <div className="flex-1" />

      {/* Import */}
      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFile} />
      <Button variant="outline" size="sm" onClick={handleImport}>
        <Upload className="mr-1 h-3.5 w-3.5" /> Import JSON
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Downloads */}
      <Button variant="outline" size="sm" onClick={() => downloadJson(config)}>
        <FileJson className="mr-1 h-3.5 w-3.5" /> Download JSON
      </Button>
      <Button size="sm" onClick={() => downloadBundle(config)}>
        <Download className="mr-1 h-3.5 w-3.5" /> Download Bundle
      </Button>
    </div>
  );
}
