import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code2, Download, Eye, Palette, Settings2, Smartphone } from "lucide-react";

const FEATURES = [
  { icon: Settings2, title: "JSON-Driven", desc: "Menu structure, columns, scrollability — all from a JSON config." },
  { icon: Palette, title: "Themes", desc: "Minimal, Glass, and Bold. Each theme is a single CSS file baked in." },
  { icon: Smartphone, title: "Mobile-First", desc: "Floating FAB + panel overlay designed for touch devices." },
  { icon: Eye, title: "Live Preview", desc: "Edit JSON and see the menu update in real time on the page." },
  { icon: Download, title: "One-File Export", desc: "Download a single JS file that includes theme CSS + your config." },
  { icon: Code2, title: "Zero Dependencies", desc: "The exported file is pure vanilla JS. Drop it on any site." },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Open-source menu widget
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            LastMenu
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Build a configurable floating mobile menu in seconds. Edit the JSON, preview it live, then download a single JavaScript file you can drop on <strong>any</strong> website.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/editor">
                Open Editor <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="border-muted/60">
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-slate-50 px-4 py-12 text-center">
        <p className="text-muted-foreground">No account needed. No backend. Everything runs in your browser.</p>
        <Button asChild className="mt-4" size="lg">
          <Link to="/editor">
            Start Building <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
