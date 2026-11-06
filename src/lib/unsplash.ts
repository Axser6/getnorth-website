/**
 * Unsplash photo URLs.
 *
 * next.config.ts only allows Unsplash URLs with EXACTLY this query string (a security
 * recommendation in the Next.js docs). Always build Unsplash URLs with `unsplash()` —
 * a different query string makes Next.js reject the image with HTTP 400.
 * next/image resizes the photo itself, so one source size is enough.
 */
export const UNSPLASH_QUERY = "?auto=format&fit=crop&w=1600&q=80";

export function unsplash(photoId: string) {
  return `https://images.unsplash.com/${photoId}${UNSPLASH_QUERY}`;
}
