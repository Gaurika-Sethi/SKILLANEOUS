"use client";

import { useEffect, useState } from "react";
import RoadmapView from "./components/RoadmapView";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("roadmap_json");
    if (data) {
      setRoadmap(JSON.parse(data));
    }
  }, []);

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading roadmap...
      </div>
    );
  }

  return <RoadmapView roadmap={roadmap} />;
}
