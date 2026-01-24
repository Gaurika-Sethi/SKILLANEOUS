import { Suspense } from "react";
import ResumeFormClient from "./ResumeFormClient";

export default function ResumeFormPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading…</div>}>
      <ResumeFormClient />
    </Suspense>
  );
}