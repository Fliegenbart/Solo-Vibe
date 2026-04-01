import {
  Project,
  FileNode,
  TimelineEvent,
  ServerInfo,
  UploadOption,
  UploadStep,
  UploadCheck,
  DetectedProjectSummary,
} from "./types";

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

export const uploadSteps: UploadStep[] = [
  {
    id: "choose",
    label: "Choose your upload",
    description: "Pick how your AI-generated code should come into Solo-Vibe.",
  },
  {
    id: "inspect",
    label: "Review what Solo-Vibe detects",
    description: "We check the shape of the project before any server action happens.",
  },
  {
    id: "finish",
    label: "Create the workspace",
    description: "Your first safe version is ready and the next step is obvious.",
  },
];

export const uploadOptions: UploadOption[] = [
  {
    id: "zip",
    name: "ZIP export",
    description: "Best for Lovable, Bolt, v0, Claude, and ChatGPT downloads.",
    helper: "Upload one archive and Solo-Vibe unpacks it into a safe first snapshot.",
    recommendedFor: "Fastest way to start when an AI tool gave you a ZIP file.",
    availability: "ready",
  },
  {
    id: "folder",
    name: "Project folder",
    description: "Use the code folder already sitting on your laptop.",
    helper: "Solo-Vibe keeps the structure as-is and prepares it for version history.",
    recommendedFor: "Good when you already edited the app locally.",
    availability: "ready",
  },
  {
    id: "github",
    name: "GitHub import",
    description: "Pull from an existing repository instead of uploading files.",
    helper: "Useful later, but not part of the first closed-beta workflow yet.",
    recommendedFor: "Planned for a later version once the core upload flow is solid.",
    availability: "soon",
  },
];

export const uploadChecks: UploadCheck[] = [
  {
    id: "copy",
    label: "Create a safe first snapshot",
    detail: "Your code is stored before Solo-Vibe suggests any deployment action.",
  },
  {
    id: "detect",
    label: "Detect app type and runtime",
    detail: "The prototype checks whether this looks like a static site or a Node.js app.",
  },
  {
    id: "inspect",
    label: "Inspect the likely start path",
    detail: "We look for the files Solo-Vibe would need to build, preview, and deploy later.",
  },
];

export const detectedProjectSummary: DetectedProjectSummary = {
  runtime: "nodejs",
  framework: "Next.js application",
  entryPoint: "package.json with build/start scripts",
  storagePlan: "First snapshot stored immediately as a recoverable version",
  nextStep: "Connect your own server only after the code is safely stored",
};
