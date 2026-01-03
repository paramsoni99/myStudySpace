"use client"

import { useState } from "react"
import { CheckCircle2, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DailyFocus() {
    const [focus, setFocus] = useState("")
    const [completed, setCompleted] = useState(false)
    const [isEditing, setIsEditing] = useState(true)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && focus.trim()) {
            setIsEditing(false)
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <h3 className="font-medium text-sm text-foreground">Main Goal Today</h3>

            {isEditing ? (
                <Input
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What's the one thing?"
                    className="bg-black/20 border-white/10 h-9"
                    autoFocus
                />
            ) : (
                <div
                    onClick={() => setCompleted(!completed)}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/5 cursor-pointer hover:border-white/20 transition-all"
                >
                    {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                        <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    )}
                    <span className={`text-sm font-medium ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {focus}
                    </span>
                </div>
            )}

            {!isEditing && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="text-[10px] text-muted-foreground hover:text-white self-end"
                >
                    Edit Goal
                </button>
            )}
        </div>
    )
}
