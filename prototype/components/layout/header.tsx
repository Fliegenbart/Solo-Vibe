"use client";

import { usePathname } from "next/navigation";
import { projects } from "@/lib/mock-data";

export function Header() {
  const pathname = usePathname();

  let title = "All Projects";
  let subtitle = "";

  if (pathname.startsWith("/projects/")) {
    const id = pathname.split("/")[2];
    const project = projects.find((p) => p.id === id);
    if (project) {
      title = project.name;
      subtitle = project.description;
    }
  }

  return (
    <header className="h-14 border-b border-border flex items-center px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div>
        <h1 className="text-sm font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
