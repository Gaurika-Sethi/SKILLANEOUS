"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RoadmapView from "./components/RoadmapView";



export default function RoadmapPage() {
  const searchParams = useSearchParams();
  const roadmapRequestIdParam = searchParams.get("roadmapRequestId");

useEffect(() => {
  setMounted(true);
}, []);
  const visibility = (searchParams.get("visibility") || "public") as
    | "public"
    | "private";

  const id = searchParams.get("id"); // ✅ curated roadmap mongo id
  const source = searchParams.get("source"); // ✅ "curated" | null

  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (!mounted) return; // 🚨 wait until browser is ready

  async function load() {
    try {
      // ✅ CASE 1: Curated roadmap (fetch from DB)
      if (source === "curated" && id) {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
          "https://skillaneous.onrender.com";

        const res = await fetch(`${baseUrl}/api/v1/roadmap/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

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

        const normalizedRoadmap = {
          title: structured.title,
          sections: (structured.phases || []).map((p: any) => ({
            id: p.id,
            label: p.label,
            topics: p.topics || [],
          })),
          roadmapRequestId: id,
        };

        setRoadmap(normalizedRoadmap);
        return;
      }

      // ✅ CASE 2: Generated roadmap (sessionStorage)
      const stored = sessionStorage.getItem("roadmap_json");

      if (!stored) {
        console.warn("⚠️ sessionStorage empty on roadmap page load");
        setError("Roadmap data not found. Please generate again.");
        return;
      }

      const parsed = JSON.parse(stored);

      setRoadmap({
        ...parsed,
        roadmapRequestId:
          parsed?.roadmapRequestId ||
          roadmapRequestIdParam ||
          sessionStorage.getItem("roadmapRequestId"),
      });
    } catch (err) {
      console.error("❌ roadmap page load error:", err);
      setError("Something went wrong while loading roadmap.");
    }
  }

  load();
}, [mounted, id, source, roadmapRequestIdParam]);

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