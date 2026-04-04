import { projects, fileTree } from "@/lib/mock-data";
import { FileBrowser } from "@/components/project/file-browser";
import { StatusBar } from "@/components/project/status-bar";
import { DeployModal } from "@/components/project/deploy-modal";
import { ProjectSubnav } from "@/components/project/project-subnav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Save, Download, Eye, ArrowRight, ShieldCheck, Server } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();
  const primaryActionHref = project.nextSafeAction.href;
  const primaryActionIsExternal = primaryActionHref.startsWith("http");

  return (
    <div className="max-w-5xl space-y-6">
      <StatusBar project={project} />

      <ProjectSubnav id={id} active="files" />

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Project understanding</p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Here is what Solo-Vibe understands about this project
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-200">
            {project.understanding.summary}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            It likely needs: {project.understanding.likelyNeed}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
              Snapshot available
            </span>
            {project.serverIp ? (
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Server connected
              </span>
            ) : (
              <span className="telemetry-pill">Server not connected yet</span>
            )}
            {project.lastStableRelease && (
              <span className="telemetry-pill border-cyan-300/16 bg-cyan-400/[0.08] text-cyan-100">
                Safe rollback available
              </span>
            )}
          </div>
        </div>

        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Recommended action</p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            {project.nextSafeAction.label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            {project.nextSafeAction.detail}
          </p>

          <div className="mt-5 flex flex-col gap-3">
            {primaryActionIsExternal ? (
              <a
                href={primaryActionHref}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(56,189,248,0.84),rgba(99,102,241,0.8))] px-4 text-sm font-semibold text-slate-950 shadow-[0_12px_35px_rgba(8,145,178,0.34)] transition hover:brightness-110"
              >
                <Eye className="w-4 h-4" />
                {project.nextSafeAction.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href={primaryActionHref}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-300/22 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(56,189,248,0.84),rgba(99,102,241,0.8))] px-4 text-sm font-semibold text-slate-950 shadow-[0_12px_35px_rgba(8,145,178,0.34)] transition hover:brightness-110"
              >
                {project.serverIp ? <ShieldCheck className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                {project.nextSafeAction.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Save className="w-3.5 h-3.5" />
                Save snapshot
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <Download className="w-3.5 h-3.5" />
                Download ZIP
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="app-panel flex flex-wrap items-center gap-3 px-4 py-4">
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Eye className="w-3.5 h-3.5" />
          Preview current version
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Save className="w-3.5 h-3.5" />
          Save another snapshot
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="w-3.5 h-3.5" />
          Export ZIP
        </Button>
        {project.serverIp && (
          <div className="ml-auto">
            <DeployModal />
          </div>
        )}
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          One clear live path, with rollback available
        </span>
      </div>

      <FileBrowser files={fileTree} />
    </div>
  );
}
