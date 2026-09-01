export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendarData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

async function getPublicGitHubContributions(username: string): Promise<ContributionCalendarData | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const html = await res.text();
    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

    const tooltipMap: Record<string, number> = {};
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

    let m: RegExpExecArray | null;
    while ((m = tooltipRegex.exec(html)) !== null) {
      const id = m[1];
      const text = m[2].trim();
      const countMatch = text.match(/^([\d,]+)\s+contribution/i);
      const count = countMatch ? parseInt(countMatch[1].replace(/,/g, ""), 10) : 0;
      tooltipMap[id] = count;
    }

    const dayRegex = /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*>/g;
    const days: { date: string; count: number; weekday: number }[] = [];

    while ((m = dayRegex.exec(html)) !== null) {
      const date = m[1];
      const id = m[2];
      const count = tooltipMap[id] ?? 0;
      const dateObj = new Date(date);
      const weekday = dateObj.getDay();
      days.push({ date, count, weekday });
    }

    if (days.length === 0) return null;

    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    days.forEach((d) => {
      currentWeek.push({
        color: d.count > 0 ? "#A97848" : "rgba(212, 184, 150, 0.2)",
        contributionCount: d.count,
        date: d.date,
        weekday: d.weekday,
      });
      if (d.weekday === 6) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    return {
      totalContributions,
      weeks,
    };
  } catch (err) {
    console.error("Error fetching public GitHub contributions:", err);
    return null;
  }
}

export async function getGitHubContributions(username: string): Promise<ContributionCalendarData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
              }
            }
          }
        }
      }
    `;

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        if (!json.errors && json.data?.user?.contributionsCollection?.contributionCalendar) {
          return json.data.user.contributionsCollection.contributionCalendar;
        }
      }
    } catch (err) {
      console.error("GraphQL fetch error, falling back to public html:", err);
    }
  }

  // Fallback to public GitHub contribution scraper if token is missing or GraphQL API fails
  return getPublicGitHubContributions(username);
}
