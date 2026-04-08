import { useEffect, useRef } from "react";
import { useMenuStore } from "@/store/menuStore";
import { LAST_MENU_JS } from "@/lib/lastMenuSource";
import { THEMES } from "@/lib/themeSource";

export function MenuPreview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { config, jsonError } = useMenuStore();

  useEffect(() => {
    if (jsonError) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const themeCSS = THEMES[config.theme] || THEMES.minimal;
    const configJson = JSON.stringify(config);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}
body{background:linear-gradient(135deg,#f0f2f5,#e2e6ed);display:flex;align-items:center;justify-content:center;color:#374151}
.hint{text-align:center;padding:24px;max-width:320px}
.hint h2{font-size:18px;font-weight:700;margin-bottom:8px}
.hint p{font-size:13px;line-height:1.5;color:#6b7280}
${themeCSS}
</style>
</head>
<body>
<div class="hint">
  <h2>${escapeHtml(config.title)}</h2>
  <p>Click the floating button in the bottom-right corner to open your menu.</p>
</div>
<script>
${LAST_MENU_JS}
LastMenu.init(${configJson});
<\/script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    iframe.src = url;

    return () => URL.revokeObjectURL(url);
  }, [config, jsonError]);

  return (
    <div className="flex h-full min-h-[500px] flex-col">
      <div className="flex items-center border-b bg-white px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">Live Preview</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {config.columns} col · {config.theme} · {config.items.length} items
        </span>
      </div>
      <iframe
        ref={iframeRef}
        className="flex-1 w-full border-0"
        title="Menu Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
