"use client"

import { useState, useEffect } from "react"

interface VideoBackgroundProps {
    videoId: string
    isPlaying: boolean
}

export function VideoBackground({ videoId, isPlaying }: VideoBackgroundProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const iframeRef = useState<HTMLIFrameElement | null>(null)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Effect to toggle play/pause via postMessage
    useEffect(() => {
        const iframe = document.getElementById('bg-video-iframe') as HTMLIFrameElement
        if (iframe && iframe.contentWindow) {
            const command = isPlaying ? 'playVideo' : 'pauseVideo'
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command }), '*')
        }
    }, [isPlaying])

    if (!isLoaded) return null

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
            <div className="absolute inset-0">
                <iframe
                    id="bg-video-iframe"
                    className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&enablejsapi=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
    )
}
