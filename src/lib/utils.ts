import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function format_list(arr: string[]) {
  return new Intl.ListFormat("en-GB", {
    type: "conjunction",
  }).format(arr)
}
