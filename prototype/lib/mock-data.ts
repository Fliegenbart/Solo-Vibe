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
    lastStableRelease: "v4",
    createdAt: "2026-03-15",
    visibleState: "live_and_healthy",
    stateCopy: {
      label: "Live and healthy",
      detail: "The current live version answered the health check and can be trusted.",
    },
    nextSafeAction: {
      label: "Preview the live app",
      detail: "Check the current version before you save another snapshot or push a new release.",
      href: "http://142.132.45.12:3000",
    },
    understanding: {
      summary: "This looks like a Node.js scheduling app with a normal package-based start flow.",
      likelyNeed: "One VPS with Node.js, one public port, and one simple release path.",
    },
  },
  {
    id: "2",
    name: "Portfolio Website",
    description: "Personal portfolio built with Claude",
    runtime: "static",
    status: "draft",
    lastSnapshot: "2 days ago",
    createdAt: "2026-03-28",
    visibleState: "imported_safely",
    stateCopy: {
      label: "Imported safely",
      detail: "The code is stored, versioned, and ready for a guided server connection.",
    },
    nextSafeAction: {
      label: "Connect your server",
      detail: "The next safe step is to link one VPS so Solo-Vibe can prepare a first deploy.",
      href: "/projects/2/server",
    },
    understanding: {
      summary: "This looks like a static portfolio site that can be copied to a web server as-is.",
      likelyNeed: "A basic Ubuntu or Debian server with a web directory and one public web port.",
    },
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
    lastStableRelease: "v2",
    createdAt: "2026-03-20",
    visibleState: "attention_needed",
    stateCopy: {
      label: "Attention needed",
      detail: "The latest deploy did not answer the health check, so Solo-Vibe kept the last stable version in view.",
    },
    nextSafeAction: {
      label: "Review the failure safely",
      detail: "Check what failed, confirm what it means, then either fix the setup or restore the last stable release.",
      href: "/projects/3/server",
    },
    understanding: {
      summary: "This is a Node.js app and the last release likely failed while starting or exposing the expected port.",
      likelyNeed: "A quick server review, then either a restart with the correct settings or a restore to the stable release.",
    },
    attention: {
      happened: "The latest release did not answer Solo-Vibe's health check in time.",
      meaning: "Your older stable release is still the safest known point.",
      nextSafeStep: "Open the server page or restore the stable version before trying another live deploy.",
    },
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
    trustLabel: "Live and healthy",
    trustDetail: "This version is the current safe live point.",
    safeToRestore: true,
  },
  {
    id: "e2",
    type: "release",
    title: "Marked as release",
    description: "v4 — Added contact form",
    timestamp: "2026-03-31T14:20:00",
    relativeTime: "3 hours ago",
    releaseTag: "v4",
    trustLabel: "Safe rollback available",
    trustDetail: "If you restore this release, Solo-Vibe will make v4 live again.",
    safeToRestore: true,
  },
  {
    id: "e3",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Added contact form and validation",
    timestamp: "2026-03-31T14:18:00",
    relativeTime: "3 hours ago",
    trustLabel: "Stored safely",
    trustDetail: "This snapshot can still be promoted or restored later.",
    safeToRestore: true,
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
    trustLabel: "Previously stable",
    trustDetail: "This version worked before the current release replaced it.",
    safeToRestore: true,
  },
  {
    id: "e5",
    type: "release",
    title: "Marked as release",
    description: "v3 — New calendar design",
    timestamp: "2026-03-30T10:40:00",
    relativeTime: "Yesterday",
    releaseTag: "v3",
    trustLabel: "Safe rollback available",
    trustDetail: "Restoring this release would return the app to the last known working v3 state.",
    safeToRestore: true,
  },
  {
    id: "e6",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Redesigned calendar component",
    timestamp: "2026-03-30T10:35:00",
    relativeTime: "Yesterday",
    trustLabel: "Stored safely",
    trustDetail: "The code was saved before the release was marked live.",
    safeToRestore: true,
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
    trustLabel: "Recovered safely",
    trustDetail: "This restore brought the project back to a stable state.",
    safeToRestore: true,
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
    trustLabel: "Attention needed",
    trustDetail: "This release should not be trusted until the server issue is understood.",
  },
  {
    id: "e9",
    type: "snapshot",
    title: "Snapshot saved",
    description: "Initial upload from Lovable export",
    timestamp: "2026-03-28T09:00:00",
    relativeTime: "3 days ago",
    trustLabel: "Imported safely",
    trustDetail: "The very first version was stored before any live step happened.",
    safeToRestore: true,
  },
];

export const serverInfo: ServerInfo = {
  ip: "142.132.45.12",
  os: "Ubuntu 24.04 LTS",
  status: "connected",
  lastChecked: "2 minutes ago",
  guidedHelp:
    "Solo-Vibe checks the server for you, installs only what this project needs, and keeps the risky parts behind a guided flow.",
  nextSafeStep:
    "The server is ready. The next safe step is to preview or deploy a known snapshot.",
  requirements: [
    "One Ubuntu or Debian VPS with SSH access",
    "Root or sudo access for the first setup",
    "A public IP address you can reach from the internet",
  ],
  checks: [
    "Can Solo-Vibe reach the server over SSH?",
    "Which operating system is running there?",
    "Is the server ready for this project type?",
  ],
  installs: [
    "A deploy user with safer permissions",
    "Only the runtime tools this project needs",
    "A repeatable release path for future snapshots",
  ],
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
  plainLanguageSummary:
    "This looks like a Node.js web app that starts from a normal package setup.",
  likelyNeed:
    "It will likely need one server with Node.js and a simple start command.",
  safeStatus:
    "The code is stored safely, and no server action has happened yet.",
  nextStep: "Connect your own server only after the code is safely stored",
};
