"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoadmapView from "./components/RoadmapView";

export default function RoadmapPage() {
  const searchParams = useSearchParams();

  const visibility = (searchParams.get("visibility") || "public") as
    | "public"
    | "private";

  const id = searchParams.get("id"); // ✅ curated roadmap mongo id
  const source = searchParams.get("source"); // ✅ "curated" | null

  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // ✅ CASE 1: Curated roadmap (fetch from DB)
        if (source === "curated" && id) {
          const baseUrl =
            process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
            "http://localhost:8000";

          const res = await fetch(`${baseUrl}/api/v1/roadmap/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
          });

          // ✅ handle html error pages
          const raw = await res.text();
          let data: any;
          try {
            data = JSON.parse(raw);
          } catch {
            console.error("❌ Curated roadmap fetch returned HTML:", raw.slice(0, 200));
            setError("Roadmap not found.");
            return;
          }

          if (!data?.success) {
            setError("Roadmap not found.");
            return;
          }

          const structured = data?.data?.structured;

          if (!structured) {
            setError("Invalid roadmap data received.");
            return;
          }

          /**
           * ✅ IMPORTANT:
           * RoadmapView expects {title, sections: []}
           * but DB stores {title, phases: []}
           * So we convert phases -> sections here.
           */
          const normalizedRoadmap = {
            title: structured.title,
            sections: (structured.phases || []).map((p: any) => ({
              id: p.id,
              label: p.label,
              topics: p.topics || [],
            })),
            roadmapRequestId: id, // keep as id for topic-summary API
          };

          setRoadmap(normalizedRoadmap);
          return;
        }

        // ✅ CASE 2: Generated roadmap (sessionStorage)
        const stored = sessionStorage.getItem("roadmap_json");

        if (!stored) {
          setError("Roadmap data not found. Please generate again.");
          return;
        }

        const parsed = JSON.parse(stored);

        const roadmapRequestId =
          parsed?.roadmapRequestId ||
          sessionStorage.getItem("roadmapRequestId") ||
          sessionStorage.getItem("roadmapRequestId_json");

        setRoadmap({
          ...parsed,
          roadmapRequestId: roadmapRequestId || parsed?.roadmapRequestId,
        });
      } catch (err) {
        console.error("❌ roadmap page load error:", err);
        setError("Something went wrong while loading roadmap.");
      }
    }

    load();
  }, [id, source]);

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