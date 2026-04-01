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
  snapshot: "text-zinc-200 bg-white/[0.06] border-white/8",
  release: "text-violet-100 bg-violet-400/[0.12] border-violet-300/20",
  deploy: "text-cyan-100 bg-cyan-400/[0.12] border-cyan-300/20",
  rollback: "text-amber-100 bg-amber-400/[0.12] border-amber-300/20",
  error: "text-rose-100 bg-rose-400/[0.12] border-rose-300/20",
};

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const Icon = iconMap[event.type];
        const color = colorMap[event.type];

        return (
          <div key={event.id} className="group flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border shadow-[0_0_18px_rgba(2,8,23,0.24)]",
                  color
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              {i < events.length - 1 && (
                <div className="min-h-[18px] w-px flex-1 bg-gradient-to-b from-cyan-300/25 via-white/10 to-transparent" />
              )}
            </div>

            <div className="app-panel flex-1 min-w-0 px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  {event.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {event.releaseTag && (
                    <Badge variant="outline">
                      {event.releaseTag}
                    </Badge>
                  )}
                  {event.success === true && (
                    <Check className="w-4 h-4 text-cyan-200" />
                  )}
                  {event.success === false && (
                    <X className="w-4 h-4 text-rose-200" />
                  )}
                </div>
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/55">
                {event.relativeTime}
              </p>
              {(event.type === "release" || event.type === "snapshot") && (
                <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {event.type === "release" && (
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-[11px]">
                      <Rocket className="w-3 h-3" />
                      Go live with this
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-[11px]">
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
