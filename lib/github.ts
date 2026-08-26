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

export async function getGitHubContributions(username: string): Promise<ContributionCalendarData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN is missing in environment variables.");
    return null;
  }

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
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error("Failed to fetch GraphQL contributions:", res.statusText);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return null;
    }

    return json.data?.user?.contributionsCollection?.contributionCalendar || null;
  } catch (err) {
    console.error("Error fetching GitHub contributions:", err);
    return null;
  }
}
