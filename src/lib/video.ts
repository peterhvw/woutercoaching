/**
 * Turns a pasted video link into the address the player loads after a click.
 * Editors paste a normal YouTube or Vimeo link; any other link is assumed to
 * already be an embed address (for example from Bunny Stream).
 * Returns null when the value is not a usable https link.
 */
export function toEmbedUrl(link: string | null): string | null {
  if (!link) return null;
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  const host = url.hostname.replace(/^www\./, "");
  const segments = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" && segments[0]) {
    return youtube(segments[0]);
  }
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const id =
      url.searchParams.get("v") ??
      (["embed", "shorts", "live"].includes(segments[0]) ? segments[1] : null);
    return id ? youtube(id) : null;
  }
  if (host === "vimeo.com" && /^\d+$/.test(segments[0] ?? "")) {
    return `https://player.vimeo.com/video/${segments[0]}?dnt=1&autoplay=1`;
  }
  return url.toString();
}

function youtube(id: string): string {
  // The privacy-enhanced domain; it still only loads after the visitor clicks.
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
}
