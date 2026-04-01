import Link from "next/link";
import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ArrowRight, Orbit, ShieldCheck, Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl space-y-8">
      <section className="app-panel overflow-hidden px-6 py-7 lg:px-8 lg:py-8">
        <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_52%),radial-gradient(circle_at_65%_45%,rgba(99,102,241,0.14),transparent_40%)] lg:block" />
        <div className="absolute right-12 top-10 hidden h-48 w-48 rounded-full border border-cyan-300/12 bg-cyan-300/[0.03] blur-3xl lg:block" />
        <div className="relative grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="telemetry-pill">
              <Orbit className="h-3 w-3 text-cyan-200" />
              Precision workspace for AI-built apps
            </div>
            <h2 className="display-title mt-5 max-w-3xl text-4xl font-semibold text-white sm:text-[3.45rem]">
              Give every AI-generated project a safe operational home.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              Solo-Vibe is the workbench between “my AI created code” and
              “this is versioned, understandable, and ready for my own server.”
              No Git rituals. No platform lock-in. Just a controlled path forward.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-[1.4rem] border border-cyan-300/14 bg-cyan-400/[0.06] px-4 py-4 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/75">
                Safe first action
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                Upload a ZIP or folder and store a recoverable first snapshot before deployment.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/new"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(56,189,248,0.84),rgba(99,102,241,0.8))] px-5 text-sm font-semibold text-slate-950 shadow-[0_12px_35px_rgba(8,145,178,0.34)] transition hover:brightness-110"
              >
                <Upload className="h-4 w-4" />
                Start a new project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Snapshot first. Server later.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div className="app-panel px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Workspace telemetry
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="display-title text-4xl font-semibold text-white">
              {projects.length}
            </span>
            <span className="pb-1 text-sm text-muted-foreground">projects tracked</span>
          </div>
        </div>
        <div className="app-panel px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Live now
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="display-title text-4xl font-semibold text-cyan-100">
              {projects.filter((p) => p.status === "live").length}
            </span>
            <span className="pb-1 text-sm text-muted-foreground">deployments active</span>
          </div>
        </div>
        <div className="app-panel px-5 py-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Intervention needed
          </p>
          <div className="mt-4 flex items-end gap-3">
            <span className="display-title text-4xl font-semibold text-rose-100">
              {projects.filter((p) => p.status === "error").length}
            </span>
            <span className="pb-1 text-sm text-muted-foreground">health issue</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Project surfaces
            </p>
            <h3 className="display-title mt-2 text-3xl font-semibold text-white">
              Operate your current builds
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Each project should read like a controlled asset, not a loose demo card.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
