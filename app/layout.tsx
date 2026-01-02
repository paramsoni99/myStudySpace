import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Outfit } from "next/font/google"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata = {
  title: "StudySpace - Aesthetic Study Workspace",
  description: "A beautiful and functional study workspace with clock, calendar, timer, notes and more.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
