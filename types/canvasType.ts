
export type CanvasState =
    |   {
            mode: CanvasMode.None
        }
    |   {
            mode: CanvasMode.Pencil
        }
    |   {
            mode: CanvasMode.Press
            origin: Point
        }
    |   {
            mode: CanvasMode.Select
            origin: Point
            current?: Point
        }
    |   {
            mode: CanvasMode.Move
            current: Point
        }
    |   {
            mode: CanvasMode.Insert
            layer: LayerType.Circle | LayerType.Rectangle | LayerType.Text | LayerType.Note
        }
    |   {
            mode: CanvasMode.Resize
            initialResize: dimention
            position: Side
        }

export enum CanvasMode{
    None,
    Press,
    Select,
    Move,
    Insert,
    Resize,
    Pencil,
}

export type Color = {
    r: number
    g: number
    b: number
}

export type Angle = {
    x: number
    y: number
}

export enum LayerType{
    Rectangle,
    Circle,
    Drawing,
    Text,
    Note
}

export type RectangleLayer = {
    type: LayerType.Rectangle
    width: number
    height: number
    x: number
    y: number
    fill: Color
    value?: string
}

export type CircleLayer = {
    type: LayerType.Circle
    width: number
    height: number
    x: number
    y: number
    fill: Color
    value?: string
}

export type DrawingLayer = {
    type: LayerType.Drawing
    width: number
    height: number
    x: number
    y: number
    fill: Color
    points: number[][]
    value?: string
}

export type TextLayer = {
    type: LayerType.Text
    width: number
    height: number
    x: number
    y: number
    fill: Color
    value?: string
}

export type NoteLayer = {
    type: LayerType.Note
    width: number
    height: number
    x: number
    y: number
    fill: Color
    value?: string
}

export type Point = {
    x: number
    y: number
}

export type dimention = {
    width: number
    height: number
    x: number
    y: number
}

export enum Side{
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}

export function mouseEventInCanvas(e: React.PointerEvent, angle: Angle){
    return{
        x: Math.round(e.clientX) - angle.x,
        y: Math.round(e.clientY) - angle.x
    }
}

export type Layer = TextLayer | NoteLayer | RectangleLayer | CircleLayer | DrawingLayer