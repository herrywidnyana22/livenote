import { Lobby } from "@/components/lobby";
import Canvas from "./_components/canvas";
import { Loading } from "./_components/loading";

interface BoardIDPageProps{
    params:{
        boardID: string
    }
}

const BoardIDPage = ({params}:BoardIDPageProps) => {
    // return <Loading/>
    return (
        <Lobby
            lobbyID={params.boardID}
            fallback={<Loading/>}
        >
            <Canvas
                boardID={params.boardID}
            />
        </Lobby>
    );
}

export default BoardIDPage