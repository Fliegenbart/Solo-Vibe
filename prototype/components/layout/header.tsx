"use client";

import { usePathname } from "next/navigation";
import { projects } from "@/lib/mock-data";

export function Header() {
  const pathname = usePathname();

  let title = "All Projects";
  let subtitle = "";

  if (pathname === "/new") {
    title = "New Project";
    subtitle = "Upload your code first. Solo-Vibe will explain the next step.";
  } else if (pathname.startsWith("/projects/")) {
    const id = pathname.split("/")[2];
    const project = projects.find((p) => p.id === id);
    if (project) {
      title = project.name;
      subtitle = project.description;
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-white/8 bg-[linear-gradient(180deg,rgba(9,14,25,0.88),rgba(9,14,25,0.68))] px-8 py-4 backdrop-blur-xl">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <div>
        <h1 className="display-title text-2xl font-semibold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-1 max-w-2xl text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
