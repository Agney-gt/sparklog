'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Users, Cpu, Bot, BarChart } from 'lucide-react'

const TechStartupBattle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cloudScale, setCloudScale] = useState(0)
  const [userBase, setUserBase] = useState(0)
  const [automation, setAutomation] = useState(0)
  const [aiAgents, setAiAgents] = useState(0)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawUI = () => {
      // Set canvas size
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2) // Scale for retina displays

      const width = canvas.width / 2
      const height = canvas.height / 2

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#1a1a2e')
      gradient.addColorStop(1, '#16213e')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Progress bars
      const barWidth = width * 0.4
      const barHeight = height * 0.06
      const barY = height * 0.1

      // Cloud Scale progress bar
      ctx.fillStyle = '#4a9ff5' // Blue
      ctx.fillRect(width * 0.05, barY, barWidth * (cloudScale / 100), barHeight)

      // User Base progress bar
      ctx.fillStyle = '#f5a742' // Orange
      ctx.fillRect(width - width * 0.05 - barWidth * (userBase / 100), barY, barWidth * (userBase / 100), barHeight)

      // Progress bar outlines
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.strokeRect(width * 0.05, barY, barWidth, barHeight)
      ctx.strokeRect(width - width * 0.05 - barWidth, barY, barWidth, barHeight)

      // "UNICORN STATUS" text
      ctx.font = 'bold 28px "Press Start 2P", cursive'
      ctx.fillStyle = '#ff0' // Yellow
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Create glow effect
      ctx.shadowColor = '#ff0'
      ctx.shadowBlur = 15
      ctx.fillText('Cloud Economies of Scale', width / 2, height / 2)

      // Reset shadow
      ctx.shadowBlur = 0

      // Progress labels
      ctx.font = '16px "Press Start 2P", cursive'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'left'
      ctx.fillText('SaaS Free Tiers', width * 0.05, barY + barHeight + 20)
      ctx.textAlign = 'right'
      ctx.fillText('Cloud Credits', width - width * 0.05, barY + barHeight + 20)

      // Progress percentages
      ctx.font = '14px "Press Start 2P", cursive'
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(`${cloudScale}%`, width * 0.25, barY + barHeight / 2)
      ctx.fillText(`${userBase}%`, width * 0.75, barY + barHeight / 2)

      // Additional stats
      ctx.font = '12px "Press Start 2P", cursive'
      ctx.textAlign = 'left'
      ctx.fillText(`Automation: ${automation}%`, width * 0.05, height * 0.8)
      ctx.fillText(`AI Agents: ${aiAgents}`, width * 0.05, height * 0.85)
      
    }

    drawUI()

    const handleResize = () => {
      drawUI()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [cloudScale, userBase, automation, aiAgents])

  const handleCloudScale = () => {
    setCloudScale(prev => Math.min(prev + 10, 100))
  }

  const handleUserBase = () => {
    setUserBase(prev => Math.min(prev + 5, 100))
  }

  const handleAutomation = () => {
    setAutomation(prev => Math.min(prev + 5, 100))
  }

  const handleAIAgents = () => {
    setAiAgents(prev => prev + 1)
  }
  const handleBootstrap = () => {
    window.open("https://agneynalapat.gumroad.com/l/BAM", "_blank");
  };
 

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gray-900 p-4">
      <canvas
        ref={canvasRef}
        className="w-full aspect-[16/9] mb-4"
      />
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleCloudScale} className="flex items-center space-x-2">
          <Cloud className="w-4 h-4" />
          <span>Optimize</span>
        </Button>
        <Button onClick={handleUserBase} className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Grow Users</span>
        </Button>
        <Button onClick={handleAutomation} className="flex items-center space-x-2">
          <Cpu className="w-4 h-4" />
          <span>Automate Ops</span>
        </Button>
        <Button onClick={handleAIAgents} className="flex items-center space-x-2">
          <Bot className="w-4 h-4" />
          <span>Deploy AI</span>
        </Button>
        <Button onClick={handleBootstrap} className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
          <BarChart className="w-4 h-4" />
          <span>Bootstrap</span>
        </Button>
      </div>
    </Card>
  )
}

export default TechStartupBattle

