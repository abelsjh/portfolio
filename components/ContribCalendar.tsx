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

  // Helper to get month label placements
  const monthLabels: { name: string; weekIndex: number }[] = [];
  let lastMonth = -1;

  calendarData.weeks.forEach((week, index) => {
    const firstDayWithDate = week.contributionDays.find((d) => d.date);
    if (firstDayWithDate) {
      const date = new Date(firstDayWithDate.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ name: months[month], weekIndex: index });
        lastMonth = month;
      }
    }
  });

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs text-text-muted font-medium">
          <strong className="text-accent text-sm">{calendarData.totalContributions}</strong> contributions in the last year
        </span>
        <div className="flex items-center gap-1 text-[11px] text-text-muted">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: "rgba(212, 184, 150, 0.2)" }} />
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: "#D4B896" }} />
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: "#C09A6E" }} />
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: "#A97848" }} />
          <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: "#6B4925" }} />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="min-w-[680px] flex flex-col gap-1.5">
          {/* Month labels */}
          <div className="flex text-[10px] text-text-muted pl-6 relative h-4">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="absolute font-mono"
                style={{ left: `${m.weekIndex * 13 + 24}px` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid with day labels */}
          <div className="flex gap-1.5">
            {/* Weekday labels */}
            <div className="flex flex-col justify-between text-[9px] text-text-muted font-mono pr-1 py-[2px] h-[91px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-[3px]">
              {calendarData.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="w-[10px] h-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-pointer relative"
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
