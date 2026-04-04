export type ProjectStatus = "live" | "draft" | "error";
export type Runtime = "static" | "nodejs";
export type UploadSource = "zip" | "folder" | "github";
export type UploadAvailability = "ready" | "soon";
export type VisibleProjectState =
  | "imported_safely"
  | "project_understood"
  | "server_ready"
  | "ready_to_go_live"
  | "live_and_healthy"
  | "attention_needed"
  | "safe_rollback_available";

export interface StatusCopy {
  label: string;
  detail: string;
}

export interface UnderstandingCopy {
  summary: string;
  likelyNeed: string;
}

export interface AttentionCopy {
  happened: string;
  meaning: string;
  nextSafeStep: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  runtime: Runtime;
  status: ProjectStatus;
  liveUrl?: string;
  serverIp?: string;
  lastSnapshot?: string; // relative time
  liveRelease?: string;
  lastStableRelease?: string;
  createdAt: string;
  visibleState: VisibleProjectState;
  stateCopy: StatusCopy;
  nextSafeAction: StatusCopy & { href: string };
  understanding: UnderstandingCopy;
  attention?: AttentionCopy;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  size?: string;
}

export type EventType = "snapshot" | "release" | "deploy" | "rollback" | "error";

export interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  timestamp: string;
  relativeTime: string;
  releaseTag?: string;
  success?: boolean;
  trustLabel?: string;
  trustDetail?: string;
  safeToRestore?: boolean;
}

export interface DeployStep {
  id: string;
  label: string;
  status: "pending" | "active" | "done" | "error";
}

export interface ServerInfo {
  ip: string;
  os: string;
  status: "connected" | "setup" | "disconnected";
  lastChecked: string;
  guidedHelp: string;
  nextSafeStep: string;
  requirements: string[];
  checks: string[];
  installs: string[];
}

export interface UploadOption {
  id: UploadSource;
  name: string;
  description: string;
  helper: string;
  recommendedFor: string;
  availability: UploadAvailability;
}

export interface UploadStep {
  id: "choose" | "inspect" | "finish";
  label: string;
  description: string;
}

export interface UploadCheck {
  id: string;
  label: string;
  detail: string;
}

export interface DetectedProjectSummary {
  runtime: Runtime;
  framework: string;
  entryPoint: string;
  storagePlan: string;
  plainLanguageSummary: string;
  likelyNeed: string;
  safeStatus: string;
  nextStep: string;
}
