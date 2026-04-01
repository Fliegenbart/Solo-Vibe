import { projects } from "@/lib/mock-data";
import { ProjectCard } from "@/components/dashboard/project-card";

export default function DashboardPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Your Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} projects &middot;{" "}
            {projects.filter((p) => p.status === "live").length} live
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
