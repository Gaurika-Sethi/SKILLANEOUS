"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Users,
  Star,
  Clock,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    level: "All Levels",
    duration: "Any Duration",
    type: "All Types",
  });

  // ✅ Roadmaps now come from DB (curated)
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
        "http://localhost:8000";

      const res = await fetch(`${baseUrl}/api/v1/roadmap/curated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await res.json();

      if (data?.success) {
        setRoadmaps(
          data.data.map((r: any) => ({
            ...r.card,
            _id: r._id,
          }))
        );
      } else {
        console.error("❌ Failed to fetch curated roadmaps:", data);
      }
    } catch (err) {
      console.error("❌ Error fetching curated roadmaps:", err);
    } finally {
      setLoading(false);
    }
  }

  load();
}, []);

  // Filter logic
  const getDurationCategory = (durationStr: string) => {
    const months = parseInt(durationStr);
    if (months <= 3) return "Short (1-3 months)";
    if (months <= 6) return "Medium (4-6 months)";
    return "Long (7-12 months)";
  };

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      filters.level === "All Levels" || roadmap.level === filters.level;

    const roadmapDurationCategory = getDurationCategory(roadmap.duration);
    const matchesDuration =
      filters.duration === "Any Duration" ||
      roadmapDurationCategory === filters.duration;

    return matchesSearch && matchesLevel && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* --- HEADER --- */}
        <header className="pt-16 text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <LayoutGrid size={14} className="text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
              Explore Paths
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">Roadmaps</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore structured paths built for real career growth. <br />
            <span className="text-gray-600 text-base font-normal">
              Browse curated and community-created roadmaps.
            </span>
          </p>
        </header>

        {/* --- SEARCH & FILTERS --- */}
        <div className="space-y-6 mb-16">
          <div className="relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search roadmaps by role, skill, or keyword..."
              className="w-full bg-[#111116] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#111116] border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              <ChevronDown
                size={14}
                className={`ml-1 text-gray-500 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FilterDropdown
                  label="Skill Level"
                  value={filters.level}
                  options={["All Levels", "Beginner", "Intermediate", "Advanced"]}
                  onChange={(val) => setFilters({ ...filters, level: val })}
                />
                <FilterDropdown
                  label="Duration"
                  value={filters.duration}
                  options={[
                    "Any Duration",
                    "Short (1-3 months)",
                    "Medium (4-6 months)",
                    "Long (7-12 months)",
                  ]}
                  onChange={(val) => setFilters({ ...filters, duration: val })}
                />
                <FilterDropdown
                  label="Roadmap Type"
                  value={filters.type}
                  options={["All Types", "Curated", "Community"]}
                  onChange={(val) => setFilters({ ...filters, type: val })}
                />
              </div>
            )}
          </div>
        </div>

        {/* --- CURATED SECTION --- */}
        <section className="mb-20">
          <SectionDivider
            icon={<Star size={14} />}
            label="Curated by Skillaneous"
            color="text-cyan-400"
            bgColor="bg-cyan-400/10"
            borderColor="border-cyan-400/30"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap, idx) => (
                <RoadmapCard
                  key={roadmap._id || idx}
                  _id={roadmap._id}
                  level={roadmap.level}
                  title={roadmap.title}
                  desc={roadmap.desc}
                  tags={roadmap.tags}
                  duration={roadmap.duration}
                  students={roadmap.students}
                  color={roadmap.color}
                />
              ))}

          </div>

          {/* ✅ Optional stable loading message */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading roadmaps...</p>
            </div>
          )}

          {!loading && filteredRoadmaps.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No roadmaps found matching your filters.
              </p>
            </div>
          )}
        </section>

        {/* --- COMMUNITY SECTION --- */}
        {/* Community section left untouched */}
      </div>
    </div>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 relative">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">
        {label}
      </span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2.5 bg-[#111116] border border-white/10 rounded-xl text-xs font-medium hover:border-white/20 transition-all"
      >
        {value}
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-xs font-medium transition-colors ${
                value === option
                  ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionDivider({ icon, label, color, bgColor, borderColor }: any) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${borderColor} ${bgColor} mb-8`}
    >
      <span className={color}>{icon}</span>
      <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>
        {label}
      </span>
    </div>
  );
}

function RoadmapCard({ _id, level, title, desc, tags, duration, students, color, creator }: any) {
  const router = useRouter();

  // Determine border and glow colors based on level
  const getLevelStyles = (level: string) => {
    switch (level) {
      case "Beginner":
        return {
          border: "border-cyan-500/20 group-hover:border-cyan-500/100",
          glow: "bg-cyan-500/5 group-hover:bg-cyan-500/30",
          badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
          badgeIcon: "text-cyan-400",
        };
      case "Intermediate":
        return {
          border: "border-pink-500/20 group-hover:border-pink-500/100",
          glow: "bg-pink-500/5 group-hover:bg-pink-500/30",
          badge: "border-pink-500/30 text-pink-400 bg-pink-500/10",
          badgeIcon: "text-pink-400",
        };
      case "Advanced":
        return {
          border: "border-purple-500/20 group-hover:border-purple-500/100",
          glow: "bg-purple-500/5 group-hover:bg-purple-500/30",
          badge: "border-purple-500/30 text-purple-400 bg-purple-500/10",
          badgeIcon: "text-purple-400",
        };
      default:
        return {
          border: "border-cyan-500/20 group-hover:border-cyan-500/100",
          glow: "bg-cyan-500/5 group-hover:bg-cyan-500/30",
          badge: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
          badgeIcon: "text-cyan-400",
        };
    }
  };

  const styles = getLevelStyles(level);

  return (
    <div
      className={`flex flex-col bg-[#111116] border-2 rounded-3xl p-8 transition-all group relative overflow-hidden ${styles.border} shadow-lg group-hover:shadow-xl`}
    >
      {/* Top Meta */}
      <div className="flex justify-between items-start mb-6">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${styles.badge}`}
        >
          {level}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
          <span className="text-[10px] font-bold">5 phases</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
        {desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 font-medium"
          >
            {tag}
          </span>
        ))}
        <span className="text-[10px] px-2 py-1 bg-white/5 rounded-lg text-gray-600">
          +1
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-8">
        <div className="flex items-center gap-1.5">
          <Clock size={12} /> {duration}
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={12} /> {students} students
        </div>
      </div>

      {/* Community Creator Info */}
      {creator && (
        <div className="flex items-center gap-3 pt-6 mb-8 border-t border-white/5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white">
            {creator.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-gray-600 font-black">
              Created by
            </span>
            <span className="text-xs font-bold text-gray-300">{creator.name}</span>
          </div>
        </div>
      )}

      {/* Action */}
      <button
          type="button"
          onClick={() => {
            if (!_id) return console.error("❌ Roadmap id missing");
            router.push(`/roadmap?id=${_id}&source=curated&visibility=public`);
          }}
          className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all hover:text-black mt-auto"
          >
            View Roadmap
          </button>


      {/* Subtle background glow on hover */}
      <div
        className={`absolute -bottom-20 -right-20 w-40 h-40 blur-[100px] group-hover:shadow-lg transition-all rounded-full ${styles.glow}`}
      />
    </div>
  );
}
