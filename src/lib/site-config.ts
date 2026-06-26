const DEFAULT_SITE_URL = "https://dani-flow.com";

function normalizeSiteUrl(rawUrl: string): string {
  const normalized = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    const parsed = new URL(normalized);
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL,
);

export const siteHost = new URL(`${siteUrl}/`).host;

export const contactEmail = "danielhachac@gmail.com";
export const contactMailtoUrl = `mailto:${contactEmail}`;
export const githubUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/danihs2";
export const githubSnakeGraphUrl =
  process.env.NEXT_PUBLIC_GITHUB_SNAKE_GRAPH_URL ?? "";
export const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ??
  "https://www.linkedin.com/in/danielhachac/";
export const hackatimeUrl =
  process.env.NEXT_PUBLIC_CODING_STATS_PROVIDER === "hackatime"
    ? "https://heatmap.shymike.dev/?id=30609&timezone=UTC"
    : (process.env.NEXT_PUBLIC_WAKATIME_URL ?? siteUrl);
export const ogImageUrl = `${siteUrl}/opengraph-image`;
