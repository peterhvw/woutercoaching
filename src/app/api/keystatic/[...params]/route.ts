import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { usesGithubStorage } from "../../../../../keystatic.config";

const isProduction = process.env.NODE_ENV === "production";

const hasGithubSecrets = Boolean(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET,
);

function respond(status: number, message: string) {
  return () => new Response(message, { status });
}

function createHandlers() {
  if (!isProduction) return makeRouteHandler({ config });

  // Local file storage has no login, so it must never be reachable on a deployed site.
  if (!usesGithubStorage) {
    const notFound = respond(404, "Not found");
    return { GET: notFound, POST: notFound };
  }

  // Keep the site deployable while the editor's GitHub App is not set up yet.
  if (!hasGithubSecrets) {
    const notConfigured = respond(
      503,
      "The content editor is not configured: the KEYSTATIC_* environment variables are missing.",
    );
    return { GET: notConfigured, POST: notConfigured };
  }

  return makeRouteHandler({ config });
}

export const { GET, POST } = createHandlers();
