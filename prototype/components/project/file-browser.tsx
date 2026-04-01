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
          "w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent/50 rounded transition-colors",
          node.type === "folder" && "cursor-pointer"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {node.type === "folder" ? (
          <>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 text-muted-foreground transition-transform",
                open && "rotate-90"
              )}
            />
            <Folder className="w-4 h-4 text-purple-400" />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className={cn(node.type === "folder" && "font-medium")}>
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
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border bg-muted/30">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Files
        </span>
      </div>
      <div className="py-1">
        {files.map((node) => (
          <FileTreeItem key={node.name} node={node} />
        ))}
      </div>
    </div>
  );
}
