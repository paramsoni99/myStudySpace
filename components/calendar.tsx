"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function Calendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-2">
          {/* Icon and title removed as they are in the parent now, or we can keep them simplified */}
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {selectedDate?.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className={cn(
          "w-full border-none bg-transparent p-0",
          "rounded-md [&_.rdp-head_button]:text-slate-600 dark:[&_.rdp-head_button]:text-slate-400",
          "[&_.rdp-day_button]:text-sm [&_.rdp-day_button]:font-medium",
          "[&_.rdp-day_button:hover]:bg-slate-100 dark:[&_.rdp-day_button:hover]:bg-slate-800",
          "[&_.rdp-day_button.rdp-day_selected]:bg-primary [&_.rdp-day_button.rdp-day_selected]:text-primary-foreground",
          "[&_.rdp-day_button.rdp-day_selected]:hover:bg-primary/90",
          "[&_.rdp-day_button.rdp-day_today]:bg-accent [&_.rdp-day_button.rdp-day_today]:text-accent-foreground"
        )}
      />
    </div>
  )
}
