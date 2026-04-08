import { useMenuStore } from "@/store/menuStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { downloadJson, downloadBundle } from "@/lib/bundler";
import { SAMPLE_CONFIGS } from "@/types/menu";
import { Download, FileJson, Upload } from "lucide-react";
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

      {/* Theme quick-switch */}
      <span className="text-xs font-medium text-muted-foreground mr-1">Theme:</span>
      {(["minimal", "glass", "bold"] as const).map((t) => (
        <Button
          key={t}
          variant={config.theme === t ? "default" : "outline"}
          size="sm"
          onClick={() => setConfig({ ...config, theme: t })}
        >
          {t}
        </Button>
      ))}

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
