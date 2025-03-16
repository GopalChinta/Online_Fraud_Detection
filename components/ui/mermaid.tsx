"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface MermaidProps {
  chart: string
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && mermaidRef.current) {
      const renderDiagram = async () => {
        try {
          // Dynamically import mermaid
          const { default: mermaid } = await import("mermaid")

          // Reset the container
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = chart
          }

          // Configure and initialize mermaid
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            fontFamily: "sans-serif",
          })

          // Generate a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`

          // Render the diagram
          await mermaid.run({
            nodes: [mermaidRef.current],
          })
        } catch (error) {
          console.error("Failed to render Mermaid diagram:", error)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<div class="p-4 text-red-500 border border-red-300 rounded">Error rendering diagram. Please check console.</div>`
          }
        }
      }

      renderDiagram()
    }
  }, [chart, isClient])

  // Show a loading state until client-side rendering is ready
  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8 border rounded">
        <div className="text-muted-foreground">Loading diagram...</div>
      </div>
    )
  }

  return (
    <div ref={mermaidRef} className="mermaid overflow-auto">
      {chart}
    </div>
  )
}

export default Mermaid

