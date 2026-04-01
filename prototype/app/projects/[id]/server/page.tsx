import Link from "next/link";
import { projects, serverInfo } from "@/lib/mock-data";
import { SetupWizard } from "@/components/server/setup-wizard";
import { History, Server, FileCode } from "lucide-react";
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
    <div className="max-w-3xl space-y-6">
      {/* Navigation tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        <Link
          href={`/projects/${id}`}
          className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <FileCode className="w-3.5 h-3.5" />
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
          className="px-4 py-2.5 text-sm font-medium text-foreground border-b-2 border-purple-500 flex items-center gap-1.5"
        >
          <Server className="w-3.5 h-3.5" />
          Server
        </Link>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Server Connection</h3>
        <SetupWizard server={hasServer ? serverInfo : null} />
      </div>
    </div>
  );
}
