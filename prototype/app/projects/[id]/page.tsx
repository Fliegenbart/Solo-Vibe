import Link from "next/link";
import { projects, fileTree } from "@/lib/mock-data";
import { FileBrowser } from "@/components/project/file-browser";
import { StatusBar } from "@/components/project/status-bar";
import { DeployModal } from "@/components/project/deploy-modal";
import { Button } from "@/components/ui/button";
import { Save, Download, History, Server, Eye } from "lucide-react";
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
    <div className="max-w-4xl space-y-6">
      {/* Status bar */}
      <StatusBar project={project} />

      {/* Navigation tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        <Link
          href={`/projects/${id}`}
          className="px-4 py-2.5 text-sm font-medium text-foreground border-b-2 border-purple-500"
        >
          Files
        </Link>
        <Link
          href={`/projects/${id}/history`}
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <History className="w-3.5 h-3.5" />
          History
        </Link>
        <Link
          href={`/projects/${id}/server`}
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <Server className="w-3.5 h-3.5" />
          Server
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
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

      {/* File browser */}
      <FileBrowser files={fileTree} />
    </div>
  );
}
