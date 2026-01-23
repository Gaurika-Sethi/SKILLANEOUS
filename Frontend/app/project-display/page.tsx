import { Suspense } from "react";
import ProjectDetailsClient from "./ProjectDetailsClient";

export default function ProjectDisplayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          Loading project...
        </div>
      }
    >
      <ProjectDetailsClient />
    </Suspense>
  );
}