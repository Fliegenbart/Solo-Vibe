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

      <div className="app-panel px-5 py-5">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Project history
          </p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Snapshot and deployment timeline
          </h3>
        </div>
        <Timeline events={timeline} />
      </div>
    </div>
  );
}
