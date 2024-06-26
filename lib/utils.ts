import { Color, Point, Side, dimention } from "@/types/canvasType"
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

export function resizing(
  resize: dimention,
  position: Side,
  point: Point
){
  const result = {
    width: resize.width,
    height: resize.height,
    x: resize.x,
    y: resize.y
  }

  if((position && Side.Top) === Side.Top){
    result.y = Math.min(point.y, resize.y + resize.height)
    result.height = Math.abs(resize.y + resize.height - point.y)
  }

  if((position && Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y, resize.y)
    result.height = Math.abs(point.y - resize.y)
  }

  if((position && Side.Left) === Side.Left){
    result.x = Math.min(point.x, resize.x + resize.width)
    result.width = Math.abs(resize.x + resize.width - point.x)
  }

  if((position && Side.Right) === Side.Right){
    result.x = Math.min(point.x, resize.x)
    result.width = Math.abs(point.x - resize.x)
  }

  return result
}
