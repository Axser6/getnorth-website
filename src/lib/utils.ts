import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui's standard class-name helper: conditional classes (clsx) with
 * Tailwind conflict resolution (tailwind-merge). Components added with
 * `npx shadcn add` or copied from 21st.dev import this from "@/lib/utils".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
