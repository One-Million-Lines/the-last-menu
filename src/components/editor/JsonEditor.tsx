import { useMenuStore } from "@/store/menuStore";
import { useCallback } from "react";

export function JsonEditor() {
  const { jsonText, jsonError, setJsonText } = useMenuStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJsonText(e.target.value);
    },
    [setJsonText]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">menu.json</span>
        {jsonError && (
          <span className="text-xs font-medium text-red-500 truncate max-w-[60%]">
            {jsonError}
          </span>
        )}
        {!jsonError && (
          <span className="text-xs font-medium text-emerald-600">Valid JSON</span>
        )}
      </div>
      <textarea
        className="flex-1 resize-none bg-slate-950 p-4 font-mono text-sm text-slate-100 leading-relaxed focus:outline-none"
        value={jsonText}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
}
