import { cacheLife } from "next/cache";

/** Cached for a day so the year stays current without making pages dynamic. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
