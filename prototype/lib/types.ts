export type ProjectStatus = "live" | "draft" | "error";
export type Runtime = "static" | "nodejs";

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
