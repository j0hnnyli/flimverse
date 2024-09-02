import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const backendUrl = 'http://127.0.0.1:5000'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

