import React, { JSX } from "react";
import Image from "next/image";

export default function SideBarComponent():JSX.Element {

    return(<div className={"sidebar"}>

        <Image src="/images/TMLogoTransparent.png" alt="TM Logo" width={50} height={50} />

        <div className={"sidebar-content"} >



            <div className={"sidebar-item"} >
                Hello
            </div>

            <div className={"sidebar-item"} >
                Hello
            </div>
        
            <div className={"sidebar-item"} >
                Hello
            </div>
            <div className={"sidebar-item"} >
                Hello
            </div>
            <div className={"sidebar-item"} >
                Hello
            </div>
        
        
        </div>

    </div>)
}