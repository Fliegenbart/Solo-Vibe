"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard, Plus, Zap } from "lucide-react";
import { projects } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col border-r border-white/8 bg-[linear-gradient(180deg,rgba(8,14,28,0.96),rgba(7,11,21,0.98))] shadow-[18px_0_50px_rgba(2,8,23,0.35)]">
      <div className="border-b border-white/8 px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.38),transparent_60%),linear-gradient(180deg,rgba(14,22,44,0.95),rgba(8,14,28,1))] shadow-[0_0_28px_rgba(34,211,238,0.18)]">
            <Zap className="h-4 w-4 text-cyan-100" />
          </div>
          <div>
            <span className="display-title block text-lg font-semibold text-white">
              Solo-Vibe
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/70">
              AI Code Ops
            </span>
          </div>
        </Link>
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
          Operational space for imported AI projects
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/"
          className={cn(
            "relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
            pathname === "/"
              ? "bg-cyan-400/[0.08] text-cyan-50 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15),0_0_26px_rgba(34,211,238,0.08)]"
              : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
          )}
        >
          {pathname === "/" && <span className="absolute inset-y-2 left-0 w-px rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />}
          <LayoutDashboard className="w-4 h-4" />
          All Projects
        </Link>

        <div className="mb-2 mt-6 px-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground/70">
          Projects
        </div>

        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
              pathname.startsWith(`/projects/${p.id}`)
                ? "bg-white/[0.05] text-foreground shadow-[inset_0_0_0_1px_rgba(129,140,248,0.12)]"
                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
            )}
          >
            {pathname.startsWith(`/projects/${p.id}`) && (
              <span className="absolute inset-y-2 left-0 w-px rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
            )}
            <div
              className={cn(
                "h-2 w-2 flex-shrink-0 rounded-full",
                p.status === "live" && "bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.65)]",
                p.status === "draft" && "bg-zinc-500",
                p.status === "error" && "bg-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.55)]"
              )}
            />
            <div className="min-w-0">
              <span className="block truncate font-medium">{p.name}</span>
              <span className="block truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground/55">
                {p.stateCopy.label}
              </span>
            </div>
            <ChevronRight
              className={cn(
                "ml-auto h-4 w-4 flex-shrink-0 transition-all",
                pathname.startsWith(`/projects/${p.id}`)
                  ? "text-cyan-200"
                  : "text-muted-foreground/35 group-hover:text-muted-foreground/65"
              )}
            />
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/8 p-3">
        <div className="mb-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/65">
            Recommended path
          </p>
          <p className="mt-1 text-sm text-zinc-200">
            Import first. Verify structure. Deploy later.
          </p>
        </div>
        <Link
          href="/new"
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
            pathname === "/new"
              ? "border border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.25),rgba(59,130,246,0.18))] text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_0_28px_rgba(34,211,238,0.18)]"
              : "border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(12,74,110,0.88),rgba(8,47,73,0.94)_45%,rgba(49,46,129,0.84))] text-cyan-50 shadow-[0_10px_28px_rgba(6,78,130,0.28)] hover:brightness-110"
          )}
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>
    </aside>
  );
}
