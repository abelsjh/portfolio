"use client";

import { useState } from "react";
import { ContributionCalendarData, ContributionDay } from "@/lib/github";

interface ContribCalendarProps {
  calendarData: ContributionCalendarData | null;
}

export default function ContribCalendar({ calendarData }: ContribCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  if (!calendarData || !calendarData.weeks || calendarData.weeks.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-text-muted">
        Unable to load contribution calendar data.
      </div>
    );
  }

  // Get color for contribution intensity
  const getColor = (count: number) => {
    if (count === 0) return "rgba(212, 184, 150, 0.2)";
    if (count <= 2) return "#D4B896";
    if (count <= 5) return "#C09A6E";
    if (count <= 8) return "#A97848";
    return "#6B4925";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper to get month label placements (prevent overlap by requiring min 3 weeks gap)
  const monthLabels: { name: string; weekIndex: number }[] = [];
  let lastWeekIndex = -4;

  calendarData.weeks.forEach((week, index) => {
    const firstDayWithDate = week.contributionDays.find((d) => d.date);
    if (firstDayWithDate) {
      const date = new Date(firstDayWithDate.date);
      const dayOfMonth = date.getDate();
      if (dayOfMonth <= 7 && index - lastWeekIndex >= 3) {
        monthLabels.push({ name: months[date.getMonth()], weekIndex: index });
        lastWeekIndex = index;
      }
    }
  });

  return (
    <div className="w-full flex flex-col gap-5 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-border/40">
        <span className="text-xs text-text-muted font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <strong className="text-accent text-sm font-semibold">{calendarData.totalContributions}</strong> contributions in the last 12 months
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-mono">
          <span>Less</span>
          <span className="w-3 h-3 rounded-[3px]" style={{ background: "rgba(212, 184, 150, 0.2)" }} />
          <span className="w-3 h-3 rounded-[3px]" style={{ background: "#D4B896" }} />
          <span className="w-3 h-3 rounded-[3px]" style={{ background: "#C09A6E" }} />
          <span className="w-3 h-3 rounded-[3px]" style={{ background: "#A97848" }} />
          <span className="w-3 h-3 rounded-[3px]" style={{ background: "#6B4925" }} />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-3 touch-pan-x scrollbar-thin">
        <div className="text-[10px] text-text-muted/60 mb-2 sm:hidden flex items-center gap-1">
          <span>← Swipe to explore 365-day activity →</span>
        </div>
        <div className="min-w-[760px] flex flex-col gap-2 mx-auto justify-center">
          {/* Month labels */}
          <div className="flex text-[10px] text-text-muted/80 pl-8 relative h-4 select-none">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="absolute font-mono font-medium"
                style={{ left: `${m.weekIndex * 14.5 + 32}px` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid with day labels */}
          <div className="flex gap-2 items-start">
            {/* Weekday labels aligned to Mon (row 1), Wed (row 3), Fri (row 5) */}
            <div className="relative text-[9.5px] text-text-muted/80 font-mono w-6 h-[101px] flex-shrink-0 select-none">
              <span className="absolute top-[14.5px] left-0">Mon</span>
              <span className="absolute top-[43.5px] left-0">Wed</span>
              <span className="absolute top-[72.5px] left-0">Fri</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-[3.5px]">
              {calendarData.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3.5px]">
                  {week.contributionDays.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="w-[11px] h-[11px] rounded-[2.5px] transition-transform duration-150 hover:scale-125 cursor-pointer relative"
                      style={{
                        background: getColor(day.contributionCount),
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({
                          day,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded bg-[#1C1613] text-[#E8E0D5] text-xs shadow-lg border border-accent/20 -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
          }}
        >
          <span className="font-semibold text-accent">
            {hoveredDay.day.contributionCount} contribution{hoveredDay.day.contributionCount === 1 ? "" : "s"}
          </span>{" "}
          on {new Date(hoveredDay.day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      )}
    </div>
  );
}
