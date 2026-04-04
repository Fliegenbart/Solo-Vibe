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

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Guided server setup</p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Your server stays yours
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Solo-Vibe does not become your hosting platform. It only helps you
            prepare one server safely so a beginner can deploy without terminal work.
          </p>
        </div>
        <div className="app-panel px-5 py-5">
          <p className="eyebrow-label">Current next step</p>
          <p className="mt-3 text-sm leading-6 text-zinc-200">
            {hasServer
              ? "Your server is already connected. The next safe step is to preview or deploy a known snapshot."
              : "The next safe step is to connect one VPS. Solo-Vibe will explain what it needs and what it will change."}
          </p>
        </div>
      </div>

      <div className="app-panel px-5 py-5">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Server connection
          </p>
          <h3 className="display-title mt-2 text-2xl font-semibold text-white">
            Deployment infrastructure
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Solo-Vibe translates the server work into one guided path with clear checks and plain-language updates.
          </p>
        </div>
        <SetupWizard server={hasServer ? serverInfo : null} />
      </div>
    </div>
  );
}
