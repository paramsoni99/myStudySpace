"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, X, Circle, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  priority?: 'low' | 'medium' | 'high'
}

export default function Tasks() {
  // Load tasks from localStorage on component mount
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [newTask, setNewTask] = useState("")

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setTasks([
      {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
      },
      ...tasks
    ])
    setNewTask("")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Get stats for the header
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-foreground">Tasks</h3>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span>{pendingTasks} pending</span>
            <span>•</span>
            <span>{completedTasks} completed</span>
          </div>
        </div>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>

      <form onSubmit={addTask} className="relative flex gap-2 mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-white/5 dark:bg-black/20 border-white/10 pr-10 focus-visible:ring-primary"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full hover:bg-transparent text-muted-foreground hover:text-primary"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>

      <div className="space-y-1 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors group">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </button>
                <span className={cn(
                  "flex-1 text-sm text-foreground transition-colors duration-200",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  )
}
