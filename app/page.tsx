"use client";

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import AnalogClock from "@/components/analog-clock"
import Calendar from "@/components/calendar"
import VideoEmbed from "@/components/video-embed"
import Tasks from "@/components/tasks"
import FloatingTimer from "@/components/floating-timer"
import Notes from "@/components/notes"
import { BackgroundPaths } from "@/components/BackgroundPaths"
import StudySpaceAI from "@/components/study-space-ai"
import { GlowingBackground } from "@/components/ui/glow-background"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <BackgroundPaths title="StudySpace" />
      <main className="min-h-screen p-4 md:p-8 pt-12 relative z-10 selection:bg-purple-500/30">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center mb-12" id="clock-section">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                My Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Focus, Organize, Achieve.
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-12 h-12 border-2 bg-white/50 dark:bg-black/50 backdrop-blur-md"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Clock Section */}
              <section className="flex justify-center py-8">
                <AnalogClock />
              </section>

              {/* Stats Grid - Placeholder layout for potentially new stats if any, or just spacing */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar Section */}
                <section className="glass-card p-6 relative group">
                  <GlowingBackground />
                  <div className="relative z-10 flex flex-col h-full items-center">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 self-start flex items-center gap-2">
                      Calendar
                    </h2>
                    <Calendar />
                  </div>
                </section>

                {/* Video Embed Section */}
                <section className="glass-card p-6 relative group">
                  <GlowingBackground />
                  <div className="relative z-10 h-full">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Ambience</h2>
                    <VideoEmbed />
                  </div>
                </section>
              </div>

              {/* StudySpaceAI Section */}
              <section className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <div className="w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">AI Assistant</h2>
                  <StudySpaceAI />
                </div>
              </section>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Tasks Section */}
              <section className="glass-card p-6 relative min-h-[400px]">
                <div className="relative z-10">
                  <Tasks />
                </div>
              </section>

              {/* Floating Timer */}
              <section className="relative flex justify-center py-4">
                <FloatingTimer />
              </section>

              {/* Notes Section */}
              <section className="glass-card p-6 relative h-[500px]">
                <div className="relative z-10 h-full flex flex-col">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Quick Notes</h2>
                  <div className="flex-1 overflow-hidden">
                    <Notes />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-20 text-center text-sm text-slate-500 dark:text-slate-400 pb-8">
            <p>© {new Date().getFullYear()} StudySpace. Designed for focus.</p>
          </footer>
        </div>
      </main>
    </>
  )
}
