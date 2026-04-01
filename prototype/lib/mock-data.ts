import { Project, FileNode, TimelineEvent, ServerInfo } from "./types";

export const projects: Project[] = [
  {
    id: "1",
    name: "Scheduling Tool",
    description: "AI-generated scheduling app for freelancers",
    runtime: "nodejs",
    status: "live",
    liveUrl: "http://142.132.45.12:3000",
    serverIp: "142.132.45.12",
    lastSnapshot: "3 hours ago",
    liveRelease: "v4",
    createdAt: "2026-03-15",
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Personal portfolio built with Claude",
    runtime: "static",
    status: "draft",
    lastSnapshot: "2 days ago",
    createdAt: "2026-03-28",
  },
  {
    id: "3",
    name: "Recipe Finder",
    description: "Search recipes by ingredients — built with Lovable",
    runtime: "nodejs",
    status: "error",
    serverIp: "167.235.12.88",
    lastSnapshot: "5 hours ago",
    liveRelease: "v2",
    createdAt: "2026-03-20",
  },
];

export const fileTree: FileNode[] = [
  {
    name: "public",
    type: "folder",
    children: [
      { name: "favicon.ico", type: "file", size: "4 KB" },
      { name: "logo.svg", type: "file", size: "2 KB" },
    ],
  },
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Header.jsx", type: "file", size: "1.2 KB" },
          { name: "Calendar.jsx", type: "file", size: "3.8 KB" },
          { name: "BookingForm.jsx", type: "file", size: "2.1 KB" },
        ],
      },
      { name: "App.jsx", type: "file", size: "1.5 KB" },
      { name: "index.js", type: "file", size: "0.3 KB" },
      { name: "styles.css", type: "file", size: "4.2 KB" },
    ],
  },
  { name: "package.json", type: "file", size: "0.8 KB" },
  { name: "index.html", type: "file", size: "0.5 KB" },
];

export const timeline: TimelineEvent[] = [
  {
    id: "e1",
    type: "deploy",
    title: "Deployed v4",
    description: "Health check passed — 200 OK",
    timestamp: "2026-03-31T14:23:00",
    relativeTime: "3 hours ago",
    releaseTag: "v4",
    success: true,
  },
  {
    id: "e2",
    type: "release",
    title: "Marked as release",
    description: "v4 — Added contact form",
    timestamp: "2026-03-31T14:20:00",
    relativeTime: "3 hours ago",
    releaseTag: "v4",
  },
  {
    id: "e3",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Added contact form and validation",
    timestamp: "2026-03-31T14:18:00",
    relativeTime: "3 hours ago",
  },
  {
    id: "e4",
    type: "deploy",
    title: "Deployed v3",
    description: "Health check passed — 200 OK",
    timestamp: "2026-03-30T10:45:00",
    relativeTime: "Yesterday",
    releaseTag: "v3",
    success: true,
  },
  {
    id: "e5",
    type: "release",
    title: "Marked as release",
    description: "v3 — New calendar design",
    timestamp: "2026-03-30T10:40:00",
    relativeTime: "Yesterday",
    releaseTag: "v3",
  },
  {
    id: "e6",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Redesigned calendar component",
    timestamp: "2026-03-30T10:35:00",
    relativeTime: "Yesterday",
  },
  {
    id: "e7",
    type: "rollback",
    title: "Rolled back to v2",
    description: "Restored previous version after layout issue",
    timestamp: "2026-03-29T16:00:00",
    relativeTime: "2 days ago",
    releaseTag: "v2",
    success: true,
  },
  {
    id: "e8",
    type: "deploy",
    title: "Deployed v3 (failed)",
    description: "Health check failed — timeout after 30s",
    timestamp: "2026-03-29T15:50:00",
    relativeTime: "2 days ago",
    releaseTag: "v3",
    success: false,
  },
  {
    id: "e9",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Initial upload from Lovable export",
    timestamp: "2026-03-28T09:00:00",
    relativeTime: "3 days ago",
  },
];

export const serverInfo: ServerInfo = {
  ip: "142.132.45.12",
  os: "Ubuntu 24.04 LTS",
  status: "connected",
  lastChecked: "2 minutes ago",
};
