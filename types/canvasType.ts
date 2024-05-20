
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

export type BaseLayer = {
    type: LayerType;
    width: number;
    height: number;
    x: number;
    y: number;
    fill: Color;
    value?: string;
    textColor?: Color;
    textAlign?: TextAlign | "center"
    textSize?: string
    isBold?: boolean
    isItalic?:boolean
    isUnderline?: boolean
    fontFamily?: any
}

export type RectangleLayer = BaseLayer & {
    type: LayerType.Rectangle;
}

export type CircleLayer = BaseLayer & {
    type: LayerType.Circle;
}

export type DrawingLayer = BaseLayer & {
    type: LayerType.Drawing;
    point: number[][];
}

export type TextLayer = BaseLayer & {
    type: LayerType.Text;
}

export type NoteLayer = BaseLayer & {
    type: LayerType.Note;
}

export type Layer = RectangleLayer | CircleLayer | DrawingLayer | TextLayer | NoteLayer

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

export enum TextAlign {
    alignLeft = "left",
    alignRight = "right",
    alignCenter = "center",
    alignJustify = "justify",
}

export type FontApps = {
    bold: boolean
    italic: boolean
    underline: boolean
}