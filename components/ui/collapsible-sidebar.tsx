"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface CollapsibleSidebarProps {
    children: React.ReactNode
    side?: "left" | "right"
    defaultCollapsed?: boolean
    width?: string
    className?: string
}

export function CollapsibleSidebar({
    children,
    side = "left",
    defaultCollapsed = false,
    width = "320px",
    className,
}: CollapsibleSidebarProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

    return (
        <motion.div
            initial={false}
            animate={{
                width: isCollapsed ? "60px" : width,
                transition: { type: "spring", stiffness: 300, damping: 30 }
            }}
            className={cn(
                "relative flex flex-col h-[calc(100vh-2rem)]",
                "glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors",
                className
            )}
        >
            <div className={cn(
                "absolute top-4 z-50",
                side === "left" ? "right-2" : "left-2"
            )}>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                    {side === "left" ? (
                        isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />
                    ) : (
                        isCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <div className="flex-1 overflow-hidden h-full relative">
                <motion.div
                    animate={{
                        opacity: isCollapsed ? 0 : 1,
                        x: isCollapsed ? (side === "left" ? -20 : 20) : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-full w-full p-4 overflow-y-auto"
                >
                    {children}
                </motion.div>

                {/* Collapsed View vertical text or icon could go here if we wanted */}
            </div>
        </motion.div>
    )
}
