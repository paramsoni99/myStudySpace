"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Clock, GripHorizontal } from "lucide-react"

export default function FloatingTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const timerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement | null>(null)

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (interval) clearInterval(interval)
            setIsActive(false)
            // Play sound or notification here
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
  }

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        setPosition({
          x: e.clientX - dragRef.current.offsetWidth / 2,
          y: e.clientY - dragRef.current.offsetHeight / 2,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = timerRef.current
  }

  const formatTime = (min: number, sec: number) => {
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div
      ref={timerRef}
      className="glass-card p-4 w-full max-w-sm"
      style={isDragging ? { position: "fixed", left: position.x, top: position.y, zIndex: 50, width: '300px' } : {}}
    >
      <div className="flex items-center justify-between mb-4 cursor-move" onMouseDown={handleMouseDown}>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">Timer</h3>
        </div>
        <GripHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold text-foreground mb-6 font-mono tracking-wider tabular-nums">
          {formatTime(minutes, seconds)}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 w-full">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Minutes</label>
            <Input
              type="number"
              min="0"
              max="60"
              value={minutes}
              onChange={(e) => setMinutes(Number.parseInt(e.target.value) || 0)}
              disabled={isActive}
              className="h-9 bg-white/5 border-white/10"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Seconds</label>
            <Input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Number.parseInt(e.target.value) || 0)}
              disabled={isActive}
              className="h-9 bg-white/5 border-white/10"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <Button
            onClick={toggleTimer}
            variant="default"
            size="sm"
            className={`flex-1 ${isActive ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}`}
          >
            {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
