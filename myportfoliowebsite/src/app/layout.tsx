import "./global.css"

export const metadata:object = {
    title:"Taha Malik Portfolio",
    description: "3D Render of my room with special things interactable that highlight things about me"
}

// all its saying any object comes in, destructure for children property, then it also checks for
// its type and makes sure that obejcts children property is React.ReactNode type, they way it targets type setting
// of the property itself and not the object is the second round of destructuring {children:React.ReactNode}
export default function RootLayout({children}: {children:React.ReactNode}){

    return (
        <html lang="en" suppressHydrationWarning style={{backgroundColor:"#fabb69", margin: 0, padding: 0, height: "100%"}}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap" rel="stylesheet" />
            </head>
            <body suppressHydrationWarning style={{margin: 0, padding: 0, height: "100%", overflow: "hidden"}}>
                {children}
            </body>
        </html>
    )

}