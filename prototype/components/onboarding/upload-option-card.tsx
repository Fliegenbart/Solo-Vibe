"use client";

import { Badge } from "@/components/ui/badge";
import { UploadOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock3 } from "lucide-react";

interface UploadOptionCardProps {
  option: UploadOption;
  selected: boolean;
  onSelect: (id: UploadOption["id"]) => void;
}

export function UploadOptionCard({
  option,
  selected,
  onSelect,
}: UploadOptionCardProps) {
  const disabled = option.availability === "soon";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={cn(
        "group relative w-full rounded-[1.2rem] border p-4 text-left transition-all duration-200",
        "bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.03]",
        selected &&
          "border-cyan-300/24 bg-cyan-400/[0.06] shadow-[0_0_0_1px_rgba(34,211,238,0.1)]",
        disabled && "cursor-not-allowed opacity-70 hover:border-white/10 hover:bg-white/[0.02]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{option.name}</p>
          <p className="text-sm leading-6 text-muted-foreground">{option.description}</p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            option.availability === "ready" &&
              "border-cyan-300/20 bg-cyan-400/[0.12] text-cyan-100",
            option.availability === "soon" &&
              "border-violet-300/16 bg-violet-400/[0.1] text-violet-100"
          )}
        >
          {option.availability === "ready" ? "Ready now" : "Soon"}
        </Badge>
      </div>

      <div className="mt-4 border-t border-white/8 pt-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
          Best for
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/90">{option.recommendedFor}</p>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="max-w-[85%] leading-5">{option.helper}</span>
        {disabled ? (
          <Clock3 className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-cyan-200 transition-transform group-hover:translate-x-0.5" />
        )}
      </div>
    </button>
  );
}
