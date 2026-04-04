import Link from "next/link";
import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/dashboard/project-card";
import {
  ArrowRight,
  Orbit,
  ShieldCheck,
  Sparkles,
  Upload,
  Waypoints,
} from "lucide-react";

export default function DashboardPage() {
  const importedProject = projects.find((project) => project.visibleState === "imported_safely");
  const liveProject = projects.find((project) => project.visibleState === "live_and_healthy");
  const attentionProject = projects.find((project) => project.visibleState === "attention_needed");

  return (
    <div className="max-w-6xl space-y-8">
      <section className="app-panel overflow-hidden px-6 py-7 lg:px-8 lg:py-8">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_52%),radial-gradient(circle_at_65%_45%,rgba(99,102,241,0.16),transparent_40%)] lg:block" />
        <div className="absolute left-10 top-8 hidden h-20 w-20 rounded-full border border-cyan-300/10 bg-cyan-300/[0.03] blur-2xl lg:block" />
        <div className="absolute right-12 top-10 hidden h-48 w-48 rounded-full border border-cyan-300/12 bg-cyan-300/[0.03] blur-3xl lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.82fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="telemetry-pill">
              <Orbit className="h-3 w-3 text-cyan-200" />
              Precision workspace for AI-built apps
            </div>
            <h2 className="display-title mt-5 max-w-3xl text-4xl font-semibold text-white sm:text-[3.45rem]">
              Give every AI-generated project a safe operational home.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              Solo-Vibe turns loose AI output into a controlled workspace:
              stored first, inspected in plain language, then prepared for your
              own server when you are ready.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="telemetry-pill">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Snapshot first
              </span>
              <span className="telemetry-pill">
                <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                Plain-language checks
              </span>
              <span className="telemetry-pill">
                <Waypoints className="h-3.5 w-3.5 text-violet-200" />
                Own-server ready
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="metric-shell">
              <div className="relative">
                <p className="eyebrow-label text-cyan-100/75">Launch protocol</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Import code, verify the structure, then create a safe workspace.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">
                  The first action is intentionally boring and safe. That is what
                  makes the rest feel reliable.
                </p>
              </div>
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
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground/85">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Safe import path
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="app-panel px-5 py-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-3 md:divide-x md:divide-white/8">
          <div className="md:pr-4">
            <p className="eyebrow-label">Workspace telemetry</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="display-title text-4xl font-semibold text-white">
                {projects.length}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">projects tracked</span>
            </div>
          </div>
          <div className="md:px-4">
            <p className="eyebrow-label">Live now</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="display-title text-4xl font-semibold text-cyan-100">
                {projects.filter((p) => p.status === "live").length}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">deployments active</span>
            </div>
          </div>
          <div className="md:pl-4">
            <p className="eyebrow-label">Intervention needed</p>
            <div className="mt-4 flex items-end gap-3">
              <span className="display-title text-4xl font-semibold text-rose-100">
                {projects.filter((p) => p.status === "error").length}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">health issue</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Current priorities</p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Follow the next safe action
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Solo-Vibe should always point to one useful next move, not ten options.
          </p>

          <div className="mt-5 grid gap-3">
            {importedProject && (
              <Link
                href={importedProject.nextSafeAction.href}
                className="focus-surface block transition hover:border-cyan-300/18"
              >
                <div className="relative">
                  <p className="eyebrow-label text-cyan-100/75">Imported safely</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">
                    {importedProject.name}: {importedProject.nextSafeAction.label}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {importedProject.nextSafeAction.detail}
                  </p>
                </div>
              </Link>
            )}

            {attentionProject && (
              <Link
                href={attentionProject.nextSafeAction.href}
                className="focus-surface block border-rose-300/12 transition hover:border-rose-300/22"
              >
                <div className="relative">
                  <p className="eyebrow-label text-rose-100/75">Needs attention</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">
                    {attentionProject.name}: {attentionProject.nextSafeAction.label}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {attentionProject.attention?.meaning ?? attentionProject.nextSafeAction.detail}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Stable live point</p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Keep one version you can trust
          </h3>
          {liveProject && (
            <div className="mt-5 space-y-4">
              <div className="focus-surface">
                <div className="relative">
                  <p className="eyebrow-label text-cyan-100/75">{liveProject.stateCopy.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {liveProject.name} is currently safe to open and check.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {liveProject.stateCopy.detail}
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
                  <p className="eyebrow-label">Live version</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {liveProject.liveRelease}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3">
                  <p className="eyebrow-label">Last safe checkpoint</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {liveProject.lastStableRelease}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow-label">Project surfaces</p>
            <h3 className="display-title mt-2 text-3xl font-semibold text-white">
              Operate your current builds
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Each workspace shows its current safety state, the last trusted point, and one recommended next step.
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
