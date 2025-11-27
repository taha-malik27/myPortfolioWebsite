import { JSX } from "react";
import RoomCanvas from "./RoomCanvas";
import SideBarComponent from '@/components/cards/sideBar';

function Page(): JSX.Element {

    return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50px 1fr",
            height: "100vh",
            width: "100vw",
            overflow: "hidden", 
          }}
        >
            {/* Left side: sidebar */}
            <div style={{height: "100%" }}>
                <SideBarComponent />
            </div>

            {/* Right side: 3D Room Canvas */}
            <div style={{ backgroundColor: '#000000', width: '100%', height: '100%', overflow: 'hidden' }}>
                <RoomCanvas/>
            </div>
        </div>
    )

}

export default Page