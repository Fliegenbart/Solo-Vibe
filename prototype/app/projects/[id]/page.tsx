import { projects, fileTree } from "@/lib/mock-data";
import { FileBrowser } from "@/components/project/file-browser";
import { StatusBar } from "@/components/project/status-bar";
import { DeployModal } from "@/components/project/deploy-modal";
import { ProjectSubnav } from "@/components/project/project-subnav";
import { Button } from "@/components/ui/button";
import { Save, Download, Eye } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();

  return (
    <div className="max-w-5xl space-y-6">
      <StatusBar project={project} />

      <ProjectSubnav id={id} active="files" />

      <div className="app-panel flex flex-wrap items-center gap-3 px-4 py-4">
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Save className="w-3.5 h-3.5" />
          Save snapshot
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Eye className="w-3.5 h-3.5" />
          Preview
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Download className="w-3.5 h-3.5" />
          Download ZIP
        </Button>
        <div className="ml-auto">
          <DeployModal />
        </div>
      </div>

      <FileBrowser files={fileTree} />
    </div>
  );
}
