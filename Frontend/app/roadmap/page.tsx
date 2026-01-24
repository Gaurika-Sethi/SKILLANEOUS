import { Suspense } from "react";
import RoadmapClient from "./RoadmapClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoadmapClient />
    </Suspense>
  );
}