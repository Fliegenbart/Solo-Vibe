import { projects, timeline } from "@/lib/mock-data";
import { Timeline } from "@/components/history/timeline";
import { ProjectSubnav } from "@/components/project/project-subnav";
import { notFound } from "next/navigation";

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();

  return (
    <div className="max-w-4xl space-y-6">
      <ProjectSubnav id={id} active="history" />

      <section className="app-panel px-5 py-5">
        <p className="eyebrow-label">History as safety net</p>
        <h3 className="display-title mt-2 text-2xl font-semibold text-white">
          Every safe point stays visible
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">
          This is where Solo-Vibe shows which versions were safe, which ones failed,
          and what can be restored without guessing.
        </p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/8 pt-4 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Last stable version
            </p>
            <p className="mt-1 font-medium text-white">
              {project.lastStableRelease ?? "Initial snapshot"}
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
              Restore promise
            </p>
            <p className="mt-1 leading-6 text-zinc-200">
              Restoring a safe version makes that version live again. Your current project stays saved in history.
            </p>
          </div>
        </div>
      </section>

      <div className="app-panel px-5 py-5">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Project history
          </p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Snapshot and deployment timeline
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Safe versions are marked clearly so a beginner can tell what can be restored without guessing.
          </p>
        </div>
        <Timeline events={timeline} />
      </div>
    </div>
  );
}
