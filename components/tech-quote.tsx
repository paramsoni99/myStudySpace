"use client"

import { useState, useEffect } from "react"
import { Quote } from "lucide-react"

const TECH_QUOTES = [
    { text: "It works on my machine.", author: "Every Developer" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Comments are like code. They rot.", author: "Anon" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
]

export default function TechQuote() {
    const [quote, setQuote] = useState(TECH_QUOTES[0])

    useEffect(() => {
        // Random quote on mount
        setQuote(TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)])

        // Rotate every 5 minutes
        const interval = setInterval(() => {
            setQuote(TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)])
        }, 300000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative p-4 rounded-xl bg-white/5 border border-white/5">
            <Quote className="absolute top-2 left-2 w-4 h-4 text-primary/40 -scale-x-100" />
            <div className="flex flex-col items-center text-center gap-2 pt-2">
                <p className="text-sm font-medium italic text-slate-200">"{quote.text}"</p>
                <p className="text-xs text-muted-foreground">- {quote.author}</p>
            </div>
        </div>
    )
}
