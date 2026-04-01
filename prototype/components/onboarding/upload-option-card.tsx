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
        "w-full rounded-[1.35rem] border p-4 text-left transition-all duration-200",
        "bg-[linear-gradient(180deg,rgba(17,24,39,0.86),rgba(11,17,30,0.96))] hover:border-cyan-300/18 hover:bg-[linear-gradient(180deg,rgba(19,29,44,0.94),rgba(11,17,30,0.98))]",
        selected &&
          "border-cyan-300/28 bg-[linear-gradient(180deg,rgba(23,37,53,0.98),rgba(8,22,38,0.98))] shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_0_34px_rgba(34,211,238,0.12)]",
        disabled && "cursor-not-allowed opacity-70 hover:border-white/10 hover:bg-[linear-gradient(180deg,rgba(17,24,39,0.86),rgba(11,17,30,0.96))]"
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

      <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.025] p-3">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
          Best for
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/90">{option.recommendedFor}</p>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{option.helper}</span>
        {disabled ? (
          <Clock3 className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-cyan-200" />
        )}
      </div>
    </button>
  );
}
