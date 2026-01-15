"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoadmapView from "./components/RoadmapView";

export default function RoadmapPage() {
  const searchParams = useSearchParams();
  const visibility = (searchParams.get("visibility") || "public") as
    | "public"
    | "private";

  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("roadmap_json");

    if (!stored) {
      setError("Roadmap data not found. Please generate again.");
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      // ✅ try to get roadmapRequestId from storage or from parsed object
      const roadmapRequestId =
        parsed?.roadmapRequestId ||
        sessionStorage.getItem("roadmapRequestId") ||
        sessionStorage.getItem("roadmapRequestId_json");

      if (!roadmapRequestId) {
        console.warn("⚠️ roadmapRequestId not found in sessionStorage or roadmap_json");
      }

      // ✅ attach it so RoadmapView can call topic-summary API
      setRoadmap({
        ...parsed,
        roadmapRequestId: roadmapRequestId || parsed?.roadmapRequestId,
      });
    } catch {
      setError("Invalid roadmap data.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading roadmap...
      </div>
    );
  }

  return <RoadmapView roadmap={roadmap} visibility={visibility} />;
}