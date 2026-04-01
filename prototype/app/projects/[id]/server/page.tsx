import { projects, serverInfo } from "@/lib/mock-data";
import { SetupWizard } from "@/components/server/setup-wizard";
import { ProjectSubnav } from "@/components/project/project-subnav";
import { notFound } from "next/navigation";

export default async function ServerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();

  const hasServer = !!project.serverIp;

  return (
    <div className="max-w-4xl space-y-6">
      <ProjectSubnav id={id} active="server" />

      <div className="app-panel px-5 py-5">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Server connection
          </p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Deployment infrastructure
          </h3>
        </div>
        <SetupWizard server={hasServer ? serverInfo : null} />
      </div>
    </div>
  );
}
