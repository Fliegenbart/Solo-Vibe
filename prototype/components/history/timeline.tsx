import {
  Save,
  Tag,
  Rocket,
  RotateCcw,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TimelineEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap = {
  snapshot: Save,
  release: Tag,
  deploy: Rocket,
  rollback: RotateCcw,
  error: AlertCircle,
};

const colorMap = {
  snapshot: "text-muted-foreground bg-muted",
  release: "text-purple-400 bg-purple-500/10",
  deploy: "text-blue-400 bg-blue-500/10",
  rollback: "text-amber-400 bg-amber-500/10",
  error: "text-red-400 bg-red-500/10",
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-1">
      {events.map((event, i) => {
        const Icon = iconMap[event.type];
        const color = colorMap[event.type];

        return (
          <div key={event.id} className="flex gap-3 group">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  color
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              {i < events.length - 1 && (
                <div className="w-px flex-1 bg-border min-h-[16px]" />
              )}
            </div>

            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {event.releaseTag && (
                    <Badge variant="outline" className="text-[10px]">
                      {event.releaseTag}
                    </Badge>
                  )}
                  {event.success === true && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                  {event.success === false && (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground/50 mt-1">
                {event.relativeTime}
              </p>
              {(event.type === "release" || event.type === "snapshot") && (
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {event.type === "release" && (
                    <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                      <Rocket className="w-3 h-3" />
                      Go live with this
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1">
                    <RotateCcw className="w-3 h-3" />
                    Restore
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
