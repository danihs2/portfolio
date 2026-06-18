import packageJson from "../../package.json";

export const CURRENT_PORTFOLIO_VERSION = packageJson.version;
export const PORTFOLIO_REPO_URL =
  process.env.NEXT_PUBLIC_PORTFOLIO_REPO_URL ?? "";
