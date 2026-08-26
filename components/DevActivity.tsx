import { Suspense } from "react";
import ContribCalendar from "./ContribCalendar";
import { getGitHubContributions } from "@/lib/github";

const USERNAME = "abelsjh";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  language: string | null;
  fork: boolean;
  stargazers_count: number;
}

async function getGitHubStats() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        next: { revalidate: 3600 },
        headers,
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`, {
        next: { revalidate: 3600 },
        headers,
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    // Aggregate language counts (excluding forks)
    const langCount: Record<string, number> = {};
    repos.forEach((r) => {
      if (!r.fork && r.language) {
        langCount[r.language] = (langCount[r.language] || 0) + 1;
      }
    });

    const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
    const topLangs = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, count]) => ({
        lang,
        pct: Math.round((count / (totalLangRepos || 1)) * 100),
      }));

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const ownRepos = repos.filter((r) => !r.fork).length;

    return {
      publicRepos: user.public_repos,
      ownRepos,
      followers: user.followers,
      totalStars,
      topLangs,
    };
  } catch {
    return null;
  }
}

// Language color map
const LANG_COLORS: Record<string, string> = {
  PHP: "#777BB4",
  JavaScript: "#D9A71E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Blade: "#f05340",
};

function getLangColor(lang: string) {
  return LANG_COLORS[lang] ?? "#A97848";
}

// Stat card subcomponent
function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      className="flex flex-col gap-1.5 p-5 rounded-2xl border transition-all duration-300 hover:border-accent/40"
      style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2 text-text-muted text-[10px] uppercase tracking-[0.18em] font-bold">
        {icon}
        {label}
      </div>
      <div
        className="text-3xl font-bold tracking-tight"
        style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-[11px] text-text-muted font-light">{sub}</div>
      )}
    </div>
  );
}

async function GitHubStatsSection() {
  const stats = await getGitHubStats();

  if (!stats) {
    return (
      <p className="text-text-muted text-sm text-center py-8">
        Could not load GitHub stats right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stat cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          }
          label="Public Repos"
          value={stats.publicRepos}
          sub={`${stats.ownRepos} original projects`}
        />
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
          label="Total Stars"
          value={stats.totalStars}
          sub="across all repositories"
        />
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Followers"
          value={stats.followers}
          sub="GitHub followers"
        />
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          label="Top Language"
          value={stats.topLangs[0]?.lang ?? "—"}
          sub={`${stats.topLangs[0]?.pct ?? 0}% of projects`}
        />
      </div>

      {/* Language breakdown bar */}
      {stats.topLangs.length > 0 && (
        <div
          className="p-5 rounded-2xl border"
          style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4">
            Language Breakdown
          </p>

          {/* Stacked bar */}
          <div className="flex h-2.5 w-full rounded-full overflow-hidden gap-[2px] mb-4">
            {stats.topLangs.map(({ lang, pct }) => (
              <div
                key={lang}
                style={{ width: `${pct}%`, background: getLangColor(lang) }}
                title={`${lang}: ${pct}%`}
              />
            ))}
            <div
              className="flex-1"
              style={{ background: "var(--border)" }}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {stats.topLangs.map(({ lang, pct }) => (
              <div key={lang} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: getLangColor(lang) }}
                />
                <span className="text-xs text-text-muted">
                  {lang}{" "}
                  <span className="font-semibold" style={{ color: "var(--text)" }}>
                    {pct}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

async function CalendarContainer() {
  const calendarData = await getGitHubContributions(USERNAME);
  return <ContribCalendar calendarData={calendarData} />;
}

export default function DevActivity() {
  return (
    <section id="activity" className="py-24 px-6 md:px-12 bg-bg border-b border-border/20 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.04]"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold block mb-3">
              Dev Activity
            </span>
            <h2
              className="text-3xl sm:text-5xl font-bold leading-[1.15] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: "var(--text)" }}
            >
              Active on{" "}
              <span
                className="italic font-normal"
                style={{ color: "var(--accent)", fontFamily: "'DM Serif Display', serif" }}
              >
                GitHub.
              </span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A live look at my coding activity — contribution history, language distribution, and repository stats pulled directly from GitHub.
            </p>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105 flex-shrink-0"
            style={{ color: "var(--accent)", borderColor: "var(--accent)", background: "var(--accent)" + "10" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            @{USERNAME}
          </a>
        </div>

        {/* Contribution Calendar */}
        <div
          className="p-6 sm:p-8 rounded-2xl border overflow-x-auto"
          style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-6">
            Contribution Graph — Last 12 Months
          </p>
          <Suspense
            fallback={
              <div className="h-[120px] flex items-center justify-center">
                <span className="text-xs text-text-muted animate-pulse">Loading contribution data from GitHub GraphQL API...</span>
              </div>
            }
          >
            <CalendarContainer />
          </Suspense>
        </div>

        {/* GitHub Stats — server-fetched */}
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl animate-pulse"
                  style={{ background: "var(--bg2)" }}
                />
              ))}
            </div>
          }
        >
          <GitHubStatsSection />
        </Suspense>
      </div>
    </section>
  );
}
