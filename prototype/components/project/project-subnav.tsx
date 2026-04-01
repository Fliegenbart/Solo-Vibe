import Link from "next/link";
import { FileCode, History, Server } from "lucide-react";

const items = [
  { key: "files", label: "Files", icon: FileCode, suffix: "" },
  { key: "history", label: "History", icon: History, suffix: "/history" },
  { key: "server", label: "Server", icon: Server, suffix: "/server" },
] as const;

export function ProjectSubnav({
  id,
  active,
}: {
  id: string;
  active: (typeof items)[number]["key"];
}) {
  return (
    <nav className="subnav-shell">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.key}
            href={`/projects/${id}${item.suffix}`}
            data-active={item.key === active}
            className="subnav-link"
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
