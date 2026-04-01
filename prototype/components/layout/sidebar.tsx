"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plus, Zap } from "lucide-react";
import { projects } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 border-r border-border bg-card flex flex-col z-20">
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Solo-Vibe</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === "/"
              ? "bg-accent text-accent-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
        >
          <LayoutDashboard className="w-4 h-4" />
          All Projects
        </Link>

        <div className="mt-5 mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Projects
        </div>

        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
              pathname.startsWith(`/projects/${p.id}`)
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full flex-shrink-0",
                p.status === "live" && "bg-green-500",
                p.status === "draft" && "bg-muted-foreground/40",
                p.status === "error" && "bg-red-500"
              )}
            />
            <span className="truncate">{p.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>
    </aside>
  );
}
