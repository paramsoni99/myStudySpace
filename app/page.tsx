
"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Maximize2, Minimize2 } from "lucide-react"
import AnalogClock from "@/components/analog-clock"
// import Calendar from "@/components/calendar" // Optional, maybe put in a tab or below tasks
import Tasks from "@/components/tasks"
import FloatingTimer from "@/components/floating-timer"
import { VideoBackground } from "@/components/video-background"
import { CollapsibleSidebar } from "@/components/ui/collapsible-sidebar"
import { Input } from "@/components/ui/input"

import VideoControl from "@/components/video-control"
import QuickLinks from "@/components/quick-links"
import DailyFocus from "@/components/daily-focus"
import TechQuote from "@/components/tech-quote"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [videoId, setVideoId] = useState("jfKfPfyJRdk") // Lofi Girl
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // if (!mounted) return null // Removing to ensure render content appears even if specific hydration is pending

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-slate-100">
      <VideoBackground key={videoId} videoId={videoId} isPlaying={isPlaying} />

      {/* Top Navigation / Controls */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 transition-all duration-300 hover:bg-black/40 group">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-4">
            {/* Header Controls removed/minimized */}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="relative z-10 flex h-screen pt-16 pb-4 px-4 gap-4">

        {/* Left Sidebar - Tasks */}
        <CollapsibleSidebar side="left" width="350px" defaultCollapsed={false}>
          <div className="flex flex-col h-full gap-6">
            <div className="glass-card p-4 flex-1 overflow-hidden backdrop-blur-3xl bg-black/20 border-white/5 shadow-inner">
              <Tasks />
            </div>
          </div>
        </CollapsibleSidebar>

        {/* Center Area - Focus */}
        <div className="flex-1 flex flex-col items-center justify-center relative min-w-0">
          <div className="scale-125 mb-12">
            <AnalogClock />
          </div>

          <div className="mt-8">
            <FloatingTimer />
          </div>

          {/* Dynamic Quote or Greeting could go here */}
          <div className="absolute bottom-8 text-center opacity-80 mix-blend-overlay">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
              Build. Ship. Innovate.
            </h1>
          </div>
        </div>

        {/* Right Sidebar - Tools */}
        <CollapsibleSidebar side="right" width="320px" defaultCollapsed={false} className="items-end">
          <div className="flex flex-col h-full w-full gap-4 overflow-y-auto custom-scrollbar p-1">

            {/* 1. Daily Focus */}
            <div className="glass-card p-4 backdrop-blur-3xl bg-black/20 border-white/5 shadow-inner">
              <DailyFocus />
            </div>

            {/* 2. Video Control */}
            <div className="glass-card p-4 backdrop-blur-3xl bg-black/20 border-white/5 shadow-inner">
              <VideoControl onVideoSet={setVideoId} isPlaying={isPlaying} onTogglePlay={() => setIsPlaying(!isPlaying)} />
            </div>

            {/* 3. Quick Links */}
            <div className="glass-card p-4 backdrop-blur-3xl bg-black/20 border-white/5 shadow-inner">
              <QuickLinks />
            </div>

            {/* 4. Tech Quote */}
            <div className="glass-card p-0 backdrop-blur-3xl bg-black/20 border-white/5 shadow-inner mt-auto">
              <TechQuote />
            </div>

          </div>
        </CollapsibleSidebar>

      </div>
    </main>
  )
}

