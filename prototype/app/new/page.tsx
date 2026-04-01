import { UploadFlow } from "@/components/onboarding/upload-flow";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">
          New project
        </p>
        <h1 className="display-title mt-3 text-4xl font-semibold text-white sm:text-5xl">
          Start with the code your AI already generated
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          This flow shows the heart of Solo-Vibe: upload first, understand what
          you have, and only then move toward deployment on your own server.
        </p>
      </div>

      <UploadFlow />
    </div>
  );
}
