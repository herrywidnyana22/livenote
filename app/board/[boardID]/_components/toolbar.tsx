import { 
    Circle, 
    MousePointer2, 
    NotebookPen, 
    Pencil, 
    RectangleHorizontal, 
    Redo,  
    Type, 
    Undo
} from "lucide-react";

import { ToolButton } from "./toolButton";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvasType";


interface ToolbarProps{
    canvasState: CanvasState
    setCanvasState: (newState: CanvasState) =>  void
    undo: () => void
    redo: () => void
    isUndo: boolean
    isRedo: boolean
}

const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    isUndo,
    isRedo
}:ToolbarProps) => {
    return (
        <div
            className="
                absolute
                flex
                flex-col
                gap-y-4 
                top-[50%]
                left-2
                -translate-y-[50%]   
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    p-1.5
                    rounded-md
                    shadow-md
                    bg-white
                "
            >
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({mode: CanvasMode.None})}
                    isActive={
                        canvasState.mode === CanvasMode.None
                        || canvasState.mode === CanvasMode.Press
                        || canvasState.mode === CanvasMode.Select
                        || canvasState.mode === CanvasMode.Resize
                        || canvasState.mode === CanvasMode.Translate
                    }
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Insert,
                        layer:LayerType.Text
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Insert
                        && canvasState.layer === LayerType.Text
                    }
                />
                <ToolButton
                    label="Note"
                    icon={NotebookPen}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Insert,
                        layer:LayerType.Note
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Insert
                        && canvasState.layer === LayerType.Note
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={RectangleHorizontal}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Insert,
                        layer:LayerType.Rectangle
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Insert
                        && canvasState.layer === LayerType.Rectangle
                    }
                />
                <ToolButton
                    label="Circle"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Insert,
                        layer:LayerType.Circle
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Insert
                        && canvasState.layer === LayerType.Circle
                    }
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil,
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    }
                />
            </div>
            <div
                className="
                    flex
                    flex-col
                    items-center
                    p-1.5
                    shadow-md
                    rounded-md
                    bg-white
                "
            >
                <ToolButton
                    label="Undo"
                    icon={Undo}
                    onClick={undo}
                    isDisabled={!isUndo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo}
                    onClick={redo}
                    isDisabled={!isRedo}
                />
            </div>
        </div>
    );
}
 
export default Toolbar;

export const ToolbarSkeleton =() =>{
    return(
        <div
            className="
                absolute
                w-14 
                h-[360px]
                flex
                flex-col
                gap-y-4 
                top-[50%]
                left-2
                -translate-y-[50%]
                rounded-md
                bg-white  
            "
        />
    )
}