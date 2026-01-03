"use client"

import { ExternalLink, Github, Code2, Layers, Terminal, Database, Zap, Users } from "lucide-react"

const LINKS = [
    { name: "Drive", url: "https://drive.google.com/drive/u/0/folders/1YMo9Rk8MZclR0urQDnBRe2DT7w74v6Jq", icon: Database },
    { name: "Gemini", url: "https://gemini.google.com/u/0/app", icon: Zap },
    { name: "Teams", url: "https://teams.microsoft.com/v2/", icon: Users },
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "StackOverflow", url: "https://stackoverflow.com", icon: Layers },
    { name: "Docs", url: "https://devdocs.io", icon: Code2 },
]

export default function QuickLinks() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <h3 className="font-medium text-sm text-foreground mb-1">Dev Bookmarks</h3>
            <div className="grid grid-cols-2 gap-2">
                {LINKS.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{link.name}</span>
                        <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50" />
                    </a>
                ))}
            </div>
        </div>
    )
}
