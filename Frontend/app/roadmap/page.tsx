"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoadmapView from "./components/RoadmapView";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const roadmapRequestId = searchParams.get("roadmapRequestId");
  const visibility = (searchParams.get("visibility") || "public") as "public" | "private";

  useEffect(() => {
    if (!roadmapRequestId) {
      setError("Missing roadmap request id");
      return;
    }

    const fetchRoadmap = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/roadmap/generate-roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roadmapRequestId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to generate roadmap");
        }

        function markdownToRoadmap(markdown: string) {
          return {
            title: "Custom Learning Roadmap",
            sections: markdown
            .split("## ")
            .slice(1)
            .map(section => {
              const [label, ...rest] = section.split("\n");
              const topics = rest
            .join("\n")
            .split("### ")
            .slice(1)
            .map(topic => {
              const [title, ...subs] = topic.split("\n");
              return {
                title: title.replace("Topic:", "").trim(),
                subtopics: subs.filter(l => l.startsWith("-")).map(s => s.replace("-", "").trim())
              };
          });

        return { label: label.trim(), topics };
      }),
  };
}

    const roadmapJson = markdownToRoadmap(data.data.markdown);
    
    setRoadmap(roadmapJson);
  } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      }
    };

    fetchRoadmap();
  }, [roadmapRequestId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
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

