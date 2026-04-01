import { Globe, Clock, Server, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBar({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <Badge
        variant="outline"
        className={cn(
          "text-xs font-medium",
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

      {project.liveRelease && (
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Globe className="w-3.5 h-3.5" />
          {project.liveRelease}
        </span>
      )}

      {project.lastSnapshot && (
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Clock className="w-3.5 h-3.5" />
          Last snapshot: {project.lastSnapshot}
        </span>
      )}

      {project.serverIp && (
        <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Server className="w-3.5 h-3.5" />
          {project.serverIp}
        </span>
      )}

      {project.status === "error" && (
        <span className="flex items-center gap-1.5 text-red-400 text-xs">
          <AlertCircle className="w-3.5 h-3.5" />
          Health check failed
        </span>
      )}

      <span className="ml-auto text-xs text-muted-foreground/50 capitalize">
        {project.runtime === "nodejs" ? "Node.js" : "Static site"}
      </span>
    </div>
  );
}
