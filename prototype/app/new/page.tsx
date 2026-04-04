import { UploadFlow } from "@/components/onboarding/upload-flow";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="telemetry-pill">Safe import path</span>
        <span className="telemetry-pill">No Git required</span>
        <span className="telemetry-pill">Preview before deployment</span>
      </div>

      <UploadFlow />
    </div>
  );
}
