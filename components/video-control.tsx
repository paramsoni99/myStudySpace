"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Youtube, Search, Play, Pause } from "lucide-react"

interface VideoControlProps {
    onVideoSet: (id: string) => void
    isPlaying: boolean
    onTogglePlay: () => void
}

export default function VideoControl({ onVideoSet, isPlaying, onTogglePlay }: VideoControlProps) {
    const [inputVal, setInputVal] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputVal) return

        let id = inputVal.trim()

        // Match standard 11-char YouTube ID
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = id.match(regExp)

        if (match && match[1]) {
            id = match[1]
        }

        onVideoSet(id)
        setInputVal("")
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 mb-1">
                <Youtube className="w-4 h-4 text-red-500" />
                <h3 className="font-medium text-sm text-foreground">Change Background</h3>
            </div>

            <div className="flex gap-2 w-full">
                <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
                    <Input
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Paste YouTube Link..."
                        className="h-8 text-xs bg-black/20 border-white/10 placeholder:text-muted-foreground/50"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="h-8 w-8 shrink-0 bg-white/10 hover:bg-white/20 text-foreground"
                    >
                        <Search className="w-3 h-3" />
                    </Button>
                </form>

                <Button
                    onClick={onTogglePlay}
                    size="icon"
                    className="h-8 w-8 shrink-0 bg-primary/20 hover:bg-primary/30 text-white border border-primary/20"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
                {[
                    { id: "jfKfPfyJRdk", label: "Lofi" },
                    { id: "mPZkdNFkNps", label: "Rain" },
                    { id: "2c3H7QaFKmQ", label: "Space" },
                    { id: "yLOM8R6lbzg", label: "Space+" },
                    { id: "dhmkkBkNzew", label: "Shiv" },
                    { id: "VvJq79eiirU", label: "Linga" }
                ].map((vid) => (
                    <button
                        key={vid.id}
                        onClick={() => onVideoSet(vid.id)}
                        className="text-[10px] py-1 px-2 rounded bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors border border-white/5"
                    >
                        {vid.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
