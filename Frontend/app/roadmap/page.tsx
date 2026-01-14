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
      setRoadmap(JSON.parse(stored));
    } catch {
      setError("Invalid roadmap data.");
    }
  }, []); // ✅ dependency array is now STABLE

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