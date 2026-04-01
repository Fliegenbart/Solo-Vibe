import Link from "next/link";
import { Globe, Clock, AlertCircle, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-xl border border-border bg-card p-5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <FileCode className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm group-hover:text-purple-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {project.description}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-medium uppercase tracking-wide",
            project.status === "live" &&
              "border-green-500/30 text-green-400 bg-green-500/10",
            project.status === "draft" &&
              "border-muted-foreground/30 text-muted-foreground",
            project.status === "error" &&
              "border-red-500/30 text-red-400 bg-red-500/10"
          )}
        >
          {project.status === "live" && "Live"}
          {project.status === "draft" && "Not published"}
          {project.status === "error" && "Problem"}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
        {project.liveRelease && (
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            {project.liveRelease}
          </span>
        )}
        {project.lastSnapshot && (
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {project.lastSnapshot}
          </span>
        )}
        {project.status === "error" && (
          <span className="flex items-center gap-1 text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            Health check failed
          </span>
        )}
        <span className="ml-auto capitalize text-muted-foreground/60">
          {project.runtime === "nodejs" ? "Node.js" : "Static"}
        </span>
      </div>
    </Link>
  );
}
