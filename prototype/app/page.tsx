import Link from "next/link";
import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ArrowRight, ShieldCheck, Upload } from "lucide-react";

export default function DashboardPage() {
  const importedProject = projects.find((project) => project.visibleState === "imported_safely");
  const liveProject = projects.find((project) => project.visibleState === "live_and_healthy");
  const attentionProject = projects.find((project) => project.visibleState === "attention_needed");

  return (
    <div className="max-w-6xl space-y-6">
      <section className="px-1 py-2">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow-label">Solo-Vibe</p>
            <h2 className="display-title mt-2 text-3xl font-semibold text-white sm:text-[2.7rem]">
              Safe home for AI-built projects.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Import first, understand the project, then move toward your own server with one clear next step.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(34,211,238,0.9),rgba(56,189,248,0.84),rgba(99,102,241,0.72))] px-4 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <Upload className="h-4 w-4" />
              New project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/75">
              No Git required
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-white">{projects.length}</span> projects tracked
          </span>
          <span>
            <span className="font-medium text-white">
              {projects.filter((p) => p.status === "live").length}
            </span>{" "}
            live now
          </span>
          <span>
            <span className="font-medium text-white">
              {projects.filter((p) => p.status === "error").length}
            </span>{" "}
            need attention
          </span>
        </div>
      </section>

      <section className="app-panel px-5 py-5 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow-label">Next safe action</p>
            {importedProject && (
              <div className="mt-3">
                <h3 className="display-title text-2xl font-semibold text-white">
                  {importedProject.name}: {importedProject.nextSafeAction.label}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
                  {importedProject.nextSafeAction.detail}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={importedProject.nextSafeAction.href}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-cyan-300/18 bg-cyan-400/[0.1] px-4 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/[0.14]"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Continue safely
                  </Link>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                    Imported safely
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 border-t border-white/8 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            {attentionProject && (
              <div>
                <p className="eyebrow-label text-rose-100/75">Attention</p>
                <p className="mt-2 text-sm font-medium text-white">
                  {attentionProject.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {attentionProject.attention?.meaning ?? attentionProject.nextSafeAction.detail}
                </p>
              </div>
            )}

            {liveProject && (
              <div className="border-t border-white/8 pt-4">
                <p className="eyebrow-label">Stable live point</p>
                <p className="mt-2 text-sm font-medium text-white">
                  {liveProject.name} is safe to open and check.
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Live version {liveProject.liveRelease} with safe rollback to{" "}
                  {liveProject.lastStableRelease}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3 px-1">
          <div>
            <p className="eyebrow-label">Projects</p>
            <h3 className="display-title mt-2 text-2xl font-semibold text-white">
              Current workspaces
            </h3>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">
            Status, trusted point, next step.
          </p>
        </div>
        <div className="grid gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
