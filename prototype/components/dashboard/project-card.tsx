import Link from "next/link";
import { Globe, Clock, AlertCircle, ArrowUpRight, FileCode } from "lucide-react";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="app-panel group block px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/14 hover:shadow-[0_24px_60px_rgba(2,8,23,0.5)]"
    >
      <div className="absolute inset-y-5 left-0 hidden w-px rounded-full bg-gradient-to-b from-transparent via-cyan-300/90 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.75)] group-hover:block lg:block" />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-cyan-300/16 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_70%),rgba(255,255,255,0.02)] shadow-[0_0_18px_rgba(34,211,238,0.1)]">
            <FileCode className="h-5 w-5 text-cyan-100" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {project.runtime === "nodejs" ? "Node runtime" : "Static runtime"}
              </p>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
                  project.visibleState === "live_and_healthy" &&
                    "bg-emerald-400/[0.12] text-emerald-100",
                  project.visibleState === "imported_safely" &&
                    "bg-cyan-400/[0.12] text-cyan-100",
                  project.status === "draft" &&
                    project.visibleState !== "imported_safely" &&
                    "bg-white/[0.05] text-zinc-300",
                  project.visibleState === "attention_needed" &&
                    "bg-rose-400/[0.12] text-rose-100"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    project.visibleState === "live_and_healthy" && "bg-emerald-300",
                    project.visibleState === "imported_safely" && "bg-cyan-300",
                    project.status === "draft" &&
                      project.visibleState !== "imported_safely" &&
                      "bg-zinc-500",
                    project.visibleState === "attention_needed" && "bg-rose-300"
                  )}
                />
                {project.stateCopy.label}
              </span>
            </div>
            <h3 className="display-title mt-2 text-2xl font-semibold text-white transition-colors group-hover:text-cyan-50">
              {project.name}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
              {project.stateCopy.detail}
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/60 sm:flex">
          Open workspace
          <ArrowUpRight className="h-4 w-4 text-cyan-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/8 pt-4 md:grid-cols-[1fr_1fr_auto]">
        {project.liveRelease && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Live release
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
              <Globe className="h-3.5 w-3.5 text-cyan-200" />
              {project.liveRelease}
            </p>
          </div>
        )}
        {project.lastSnapshot && (
          <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Last snapshot
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
              <Clock className="h-3.5 w-3.5 text-cyan-200" />
              {project.lastSnapshot}
            </p>
          </div>
        )}
        <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
            Next safe action
          </p>
          <p className="mt-2 text-sm font-medium text-white">
            {project.nextSafeAction.label}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {project.nextSafeAction.detail}
          </p>
        </div>
      </div>

      {project.status === "error" && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-rose-300/16 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-100">
          <AlertCircle className="h-4 w-4 text-rose-200" />
          {project.attention?.nextSafeStep}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground/55">
        <span>{project.lastStableRelease ? `Safe rollback: ${project.lastStableRelease}` : "Controlled asset"}</span>
        <span className="sm:hidden">Open workspace</span>
      </div>
    </Link>
  );
}
