import { JSX } from "react";
import RoomCanvas from "./RoomCanvas";


function Page(): JSX.Element {

    return (

        <div style={{width :"100vw", height : "100vh"}}>
            <RoomCanvas/>
        </div>


    )

}

export default Page