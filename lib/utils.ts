import { Color } from "@/types/canvasType"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#dc2626",
  "#d97706",
  "#059669",
  "#7c3aed",
  "#db2777"
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function memberOnlineColor(connectionID: number): string {
  return COLORS[connectionID % COLORS.length]
}

export function rgbToHex(color: Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
}
