"use client";

import { useState } from "react";
import { ChevronRight, File, Folder } from "lucide-react";
import { FileNode } from "@/lib/types";
import { cn } from "@/lib/utils";

function FileTreeItem({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);

  return (
    <div>
      <button
        onClick={() => node.type === "folder" && setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/[0.04]",
          node.type === "folder" && "cursor-pointer"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {node.type === "folder" ? (
          <>
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform",
                open && "rotate-90"
              )}
            />
            <Folder className="h-4 w-4 text-cyan-200" />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className={cn(node.type === "folder" && "font-medium text-foreground")}>
          {node.name}
        </span>
        {node.size && (
          <span className="ml-auto text-xs text-muted-foreground/60">
            {node.size}
          </span>
        )}
      </button>
      {node.type === "folder" && open && node.children?.map((child) => (
        <FileTreeItem key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function FileBrowser({ files }: { files: FileNode[] }) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-white/[0.015]">
      <div className="border-b border-white/8 px-4 py-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Files
        </span>
      </div>
      <div className="py-2">
        {files.map((node) => (
          <FileTreeItem key={node.name} node={node} />
        ))}
      </div>
    </div>
  );
}
