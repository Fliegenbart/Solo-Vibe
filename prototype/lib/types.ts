export type ProjectStatus = "live" | "draft" | "error";
export type Runtime = "static" | "nodejs";
export type UploadSource = "zip" | "folder" | "github";
export type UploadAvailability = "ready" | "soon";

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
  createdAt: string;
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
  nextStep: string;
}
