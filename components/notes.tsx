"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, Trash } from "lucide-react"

type Note = {
  id: number
  content: string
  createdAt: string
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<{ id: number | null, content: string }>({ id: null, content: "" })

  // Load notes from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem("studyNotes")
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes))
        } catch (e) {
          console.error("Failed to parse notes", e)
        }
      }
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studyNotes", JSON.stringify(notes))
  }, [notes])

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      content: "",
      createdAt: new Date().toISOString(),
    }

    setNotes([...notes, newNote])
    setCurrentNote(newNote)
  }

  const saveNote = () => {
    if (!currentNote.id) return

    setNotes(notes.map((note) => (note.id === currentNote.id ? { ...note, content: currentNote.content } : note)))
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (currentNote.id === id) {
      setCurrentNote({ id: null, content: "" })
    }
  }

  const selectNote = (note: Note) => {
    setCurrentNote(note)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (e) {
      return ""
    }
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (currentNote.id) {
      setCurrentNote({ ...currentNote, content: newValue })
      setNotes(notes.map((note) => (note.id === currentNote.id ? { ...note, content: newValue } : note)))
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={createNewNote}
          className="text-primary border-primary/20 hover:bg-primary/10 dark:text-primary dark:border-primary/20 dark:hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Note
        </Button>

        {currentNote.id && (
          <Button
            variant="outline"
            size="sm"
            onClick={saveNote}
            className="text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 h-full overflow-hidden">
        {/* Notes List */}
        <div className="w-full md:w-1/3 bg-white/5 dark:bg-black/20 rounded-xl p-2 overflow-y-auto max-h-[150px] md:max-h-full custom-scrollbar border border-white/10">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No notes yet. Create one!</p>
          ) : (
            <ul className="space-y-1">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className={`p-2 rounded-lg text-sm cursor-pointer flex justify-between items-center group transition-colors
                    ${currentNote.id === note.id
                      ? "bg-primary/20 text-foreground"
                      : "hover:bg-white/10 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  onClick={() => selectNote(note)}
                >
                  <div className="truncate flex-1">
                    <p className="font-medium truncate">{note.content.split("\n")[0] || "Untitled Note"}</p>
                    <p className="text-xs opacity-70">{formatDate(note.createdAt)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNote(note.id)
                    }}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Note Editor */}
        <div className="flex-1 bg-white/5 dark:bg-black/20 rounded-xl p-2 overflow-hidden border border-white/10">
          <Textarea
            placeholder="Write your notes here..."
            className="h-full resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeolder:text-muted-foreground"
            value={currentNote.content}
            onChange={handleNotesChange}
            disabled={!currentNote.id}
          />
        </div>
      </div>
    </div>
  )
}
