import { UploadFlow } from "@/components/onboarding/upload-flow";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="px-1">
        <p className="eyebrow-label">New project</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Bring code in, let Solo-Vibe understand it, then move to the next safe step.
        </p>
      </div>

      <UploadFlow />
    </div>
  );
}
