import { JsonEditor } from "@/components/editor/JsonEditor";
import { MenuPreview } from "@/components/editor/MenuPreview";
import { Toolbar } from "@/components/editor/Toolbar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b bg-white px-4 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Back</Link>
        </Button>
        <h1 className="text-lg font-bold">LastMenu Editor</h1>
      </header>

      <Toolbar />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left: JSON editor */}
        <div className="flex-1 border-r">
          <JsonEditor />
        </div>

        {/* Right: Live preview */}
        <div className="relative flex-1 bg-gradient-to-br from-slate-50 to-slate-100">
          <MenuPreview />
        </div>
      </div>
    </div>
  );
}
