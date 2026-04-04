import Link from "next/link";
import { Globe, Clock, AlertCircle, ArrowUpRight, FileCode } from "lucide-react";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-[1.5rem] border border-white/8 bg-white/[0.02] px-5 py-4 transition-all duration-200 hover:border-white/12 hover:bg-white/[0.03]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <FileCode className="h-4 w-4 text-muted-foreground/70" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {project.runtime === "nodejs" ? "Node runtime" : "Static runtime"}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em]",
                project.visibleState === "live_and_healthy" &&
                  "bg-emerald-400/[0.1] text-emerald-100",
                project.visibleState === "imported_safely" &&
                  "bg-cyan-400/[0.1] text-cyan-100",
                project.status === "draft" &&
                  project.visibleState !== "imported_safely" &&
                  "bg-white/[0.05] text-zinc-300",
                project.visibleState === "attention_needed" &&
                  "bg-rose-400/[0.1] text-rose-100"
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

          <h3 className="display-title mt-3 text-xl font-semibold text-white transition-colors group-hover:text-cyan-50">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/60">
          Open
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-white/8 pt-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {project.liveRelease && (
            <span className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-cyan-200" />
              Live {project.liveRelease}
            </span>
          )}
          {project.lastSnapshot && (
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-cyan-200" />
              Snapshot {project.lastSnapshot}
            </span>
          )}
          {project.lastStableRelease && (
            <span>Rollback {project.lastStableRelease}</span>
          )}
        </div>

        <div className="text-sm lg:text-right">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
            Next safe action
          </p>
          <p className="mt-2 font-medium text-white">{project.nextSafeAction.label}</p>
        </div>
      </div>

      {project.status === "error" && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-rose-300/14 bg-rose-400/[0.06] px-4 py-3 text-sm text-rose-100">
          <AlertCircle className="h-4 w-4 text-rose-200" />
          {project.attention?.nextSafeStep}
        </div>
      )}
    </Link>
  );
}
