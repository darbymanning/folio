import { PUBLIC_UUID_NAMESPACE } from "$env/static/public"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v5 as uuidv5 } from "uuid"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function format_list(arr: string[]) {
  return new Intl.ListFormat("en-GB", {
    type: "conjunction",
  }).format(arr)
}

export function label_id(name: string) {
  return "a" + uuidv5(name.toLowerCase(), PUBLIC_UUID_NAMESPACE)
}

export function is_reduced_motion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
