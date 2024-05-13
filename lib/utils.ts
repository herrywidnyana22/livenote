import { Color, DrawingLayer, Layer, LayerType, Point, Side, dimention } from "@/types/canvasType"
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

  if((position & Side.Top) === Side.Top){
    result.y = Math.min(point.y, resize.y + resize.height)
    result.height = Math.abs(resize.y + resize.height - point.y)
  }

  if((position & Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y, resize.y)
    result.height = Math.abs(point.y - resize.y)
  }

  if((position & Side.Left) === Side.Left){
    result.x = Math.min(point.x, resize.x + resize.width)
    result.width = Math.abs(resize.x + resize.width - point.x)
  }

  if((position & Side.Right) === Side.Right){
    result.x = Math.min(point.x, resize.x)
    result.width = Math.abs(point.x - resize.x)
  }

  return result
}


export function findIntersectingWithRectangle(
  layerIDData: readonly string[],
  layerData: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
){
  const rectangle = {
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
  }

  const IDData = []

  for(const layerID of layerIDData){
    const layer = layerData.get(layerID)

    if(layer == null){
      continue
    }

    const { width, height, x, y } = layer

    if(
      rectangle.x + rectangle.width > x
      && rectangle.x < x + width
      && rectangle.y + rectangle.height > y
      && rectangle.y < y + height
    ){
      IDData.push(layerID)
    }
  }

  return IDData
}

export const calculateBrightness = (color: Color) => {
  const luminance = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255

  return luminance
}

export const calculateFontSize = (width: number, height: number, scale: number) =>{
  const maxSize = 96

  const sizeBasedOnWidth = width * scale
  const sizeBasedOnHeight = height * scale

  const fontSize = Math.min(sizeBasedOnWidth, sizeBasedOnHeight, maxSize)

  return fontSize
}

export function penPointToLayer(
  point: number[][],
  color: Color
): DrawingLayer{
  if (point.length < 2){
    throw new Error('Cannot draw point with less than 2 points')
  }

  let top = Number.POSITIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let left = Number.POSITIVE_INFINITY

  for (const coordinat of point){
    const [x, y] = coordinat

    if (top>y) top = y
    if (bottom<y) bottom = y
    if (left>x) left = x
    if (right<x) right = x
  }

  return{
    type: LayerType.Drawing,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    point: point.map(([x, y, pressure]) => [
      x-left,
      y-top,
      pressure
    ])
  }
}

export function getDrawingStroke(stroke: number[][]){
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i+1) % arr.length]
      acc.push(x0, y0, (x0+x1)/2, (y0+y1)/2)

      return acc
    }, ["M", ...stroke[0], "Q"]
  )

  d.push("Z")

  return d.join(" ")
}