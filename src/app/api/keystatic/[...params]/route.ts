import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config });

const unavailable = () => new Response("Not found", { status: 404 });
const localOnly = process.env.NODE_ENV !== "production";

// Local file storage must never be reachable on a deployed site.
export const GET = localOnly ? handlers.GET : unavailable;
export const POST = localOnly ? handlers.POST : unavailable;
