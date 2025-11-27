import "./global.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title:"Taha's Portfolio",
    description: "A website exploring my skills, projects, and hobbies!",
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
    },
    
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: "Taha's Portfolio",
    }
    
}

// all its saying any object comes in, destructure for children property, then it also checks for
// its type and makes sure that obejcts children property is React.ReactNode type, they way it targets type setting
// of the property itself and not the object is the second round of destructuring {children:React.ReactNode}
export default function RootLayout({children}: {children:React.ReactNode}){

    return (
        <html lang="en" suppressHydrationWarning className="gradient" style={{margin: 0, padding: 0, height: "100%"}}>
            <head>
                {/* Manifest link - critical for mobile browsers (especially Chrome) */}
                <link rel="manifest" href="/site.webmanifest" />
                {/* Additional favicon links for maximum compatibility - some mobile browsers need explicit links */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                {/* Font preconnects */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Stack+Sans+Notch:wght@200..700&display=swap" rel="stylesheet"/>
            </head>
            <body suppressHydrationWarning style={{margin: 0, padding: 0, height: "100%", overflow: "hidden"}}>
                {children}
            </body>
        </html>
    )

}