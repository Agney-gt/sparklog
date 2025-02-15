"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Define types for the card and battle log
interface CardType {
  id: string
  name: string
  damage?: number
  manaCost?: number
  image?: string
}

interface BattleLogEntry {
  type: "player" | "boss"
  message: string
}

export default function TCGGame() {
  const [bossHealth, setBossHealth] = useState<number>(100)
  const [playerHealth, setPlayerHealth] = useState<number>(100)
  const [playerMana, setPlayerMana] = useState<number>(50)
  const [inventory, setInventory] = useState<CardType[]>([])
  const [cardPlayed, setCardPlayed] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [winner, setWinner] = useState<"Player" | "Boss" | null>(null)
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const [damageAnimation, setDamageAnimation] = useState<{ player: boolean; boss: boolean }>({ player: false, boss: false })
  const [battleLog, setBattleLog] = useState<BattleLogEntry[]>([])
  const [turnCount, setTurnCount] = useState<number>(1)
  const [canSetGameOver, setCanSetGameOver] = useState<boolean>(true) // Flag to control game over state

  const { toast } = useToast()

  // Array of boss dialogues
  const bossDialogues: string[] = [
    "You think you can defeat me?",
    "Prepare to meet your doom!",
    "I will crush you like the insect you are!",
    "Your strength is nothing compared to mine!",
    "You will regret challenging me!",
    "Feel my wrath!",
    "I will enjoy watching you suffer!",
    "You are merely a stepping stone!",
    "Your fate is sealed!",
    "I will not go easy on you!",
    "You are out of your league!",
    "I will break you!"
  ]

  useEffect(() => {
    async function fetchPlayerData() {
      try {
        const response = await fetch("/api/battle")
        const data = await response.json()
        if (response.ok) {
          
          setPlayerHealth(data.HP)
          setPlayerMana(data.MP)
          setInventory(data.inventory || [])
        }
      } catch (error) {
        console.error("Failed to fetch player data", error)
      }
    }
    fetchPlayerData()
  }, [])

  useEffect(() => {
    // Check for game over conditions only once per turn
    if (canSetGameOver) {
      if (bossHealth <= 0) {
        setWinner("Player")
        setGameOver(true)
        setBossHealth(1);
        
        setCanSetGameOver(false) // Prevent further game over state changes
      } else if (playerHealth <= 0) {
        setWinner("Boss")
        setPlayerHealth(1);
        setGameOver(true)
     
        setCanSetGameOver(false) // Prevent further game over state changes
      }
    }
  }, [bossHealth, playerHealth, canSetGameOver])

  useEffect(() => {
    if (gameOver) {
      updatePlayerStats()
      setTimeout(() => {
      }, 3000)
    }
  }, [gameOver])

  async function updatePlayerStats() {
    try {
      await fetch("/api/battle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ HP: playerHealth, MP: playerMana }),
      })
    } catch (error) {
      console.error("Failed to update player stats", error)
    }
  }

  const playCard = (card: CardType) => {
    if (!playerTurn || cardPlayed) return
    const damage = card.damage || 10
    const manaCost = card.manaCost || 5
    if (playerMana >= manaCost) {
      setPlayerMana((prev) => prev - manaCost)
      setBossHealth((prev) => Math.max(prev - damage, 0))
      setCardPlayed(true)
      setDamageAnimation({ ...damageAnimation, boss: true })

      setBattleLog((prev) => [
        ...prev,
        { type: "player", message: `Turn ${turnCount}: Played "${card.name}", dealt ${damage} damage.` },
      ])

      toast({
        title: "Card Played!",
        description: `You dealt ${damage} damage to the boss!`,
      })
    } else {
      toast({
        title: "Not Enough Mana!",
        description: "You don't have enough mana to use this card.",
        variant: "destructive",
      })
    }
  }

  const endTurn = () => {
    if (!playerTurn) return
    setPlayerTurn(false)
    setCardPlayed(false)
    setTurnCount((prev) => prev + 1)

    setTimeout(() => {
      if (bossHealth > 0) {
        const bossDamage = Math.floor(Math.random() * 15) + 5
        setPlayerHealth((prev) => Math.max(prev - bossDamage, 0))
        setDamageAnimation({ ...damageAnimation, player: true })

        // Randomly select a boss dialogue
        const bossDialogue = bossDialogues[Math.floor(Math.random() * bossDialogues.length)]

        setBattleLog((prev) => [
          ...prev,
          { type: "boss", message: `Turn ${turnCount}: Boss attacked, dealt ${bossDamage} damage. "${bossDialogue}"` },
        ])

        toast({
          title: "Boss Attack!",
          description: `The boss dealt ${bossDamage} damage! "${bossDialogue}"`,
          variant: "destructive",
        })
      }
      setPlayerTurn(true)
    }, 1000)
  }

  // Function to close the dialog
  const closeDialog = () => {
    setGameOver(false);
    setWinner(null); // Reset winner state if needed
    setCanSetGameOver(true); // Allow game over state to be set again
  };

  return (
    <div className="flex justify-between items-start p-10 w-full h-screen bg-white text-black">
      {/* Player Section */}
      <div className="flex flex-col items-center w-1/3 space-y-4">
        <h1 className="text-3xl font-bold">Player</h1>
        <motion.img
          src="/avatar.png"
          alt="Player"
          className="w-40 h-40 object-cover rounded-full"
          animate={{ scale: damageAnimation.player ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => setDamageAnimation({ ...damageAnimation, player: false })}
        />
        <Progress value={playerHealth} max={100} className="w-56 h-4" />
        <Progress value={playerMana} max={50} className="w-56 h-4" />
        <div style={{ height: 100 }}></div>
        {/* Inventory Cards */}
        <div className="grid grid-cols-2 gap-6 mt-4 w-full max-w-2xl">
          <AnimatePresence>
            {inventory.map((card) => (
              <motion.div key={card.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                  className={`cursor-pointer border-2 p-6 text-center w-60 h-80 ${
                    cardPlayed ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => playCard(card)}
                >
                  <CardContent className="flex flex-col justify-between h-full">
                    <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-full h-36 object-cover mb-4 rounded-md" />
                    <p className="text-xl font-bold">{card.name}</p>
                    <p className="text-lg text-gray-800">Damage: {card.damage || 10}</p>
                    <p className="text-lg text-blue-600">Mana Cost: {card.manaCost || 5}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button onClick={endTurn} className="mt-6 px-8 py-4 text-xl">End Turn</Button>
      </div>

      {/* Battle Log */}
      <div className="w-1/3 flex flex-col items-center space-y-4 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold">Battle Log</h2>
        <div className="h-64 w-full overflow-y-auto bg-white p-2 border rounded">
          {battleLog.map((log, index) => (
            <p key={index} className={`text-sm ${log.type === "boss" ? "text-red-600" : "text-green-600"}`}>
              {log.message}
            </p>
          ))}
        </div>
      </div>

      {/* Boss Section */}
      <div className="flex flex-col items-center w-1/3 space-y-4">
        <motion.img
          src="/boss.png"
          alt="Boss"
          className="w-40 h-40 object-cover rounded-full"
          animate={{ scale: damageAnimation.boss ? 0.9 : 1 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => setDamageAnimation({ ...damageAnimation, boss: false })}
        />
        <h1 className="text-3xl font-bold">Boss</h1>
        <Progress value={bossHealth} max={100} className="w-56 h-4" />
      </div>

      {/* Game Over Dialog */}
      <Dialog open={gameOver}>
        <DialogContent>
          <DialogTitle>{winner} Wins!</DialogTitle>
          <div className="flex justify-center gap-4">
            <img src="/avatar.png" alt="Player" className="w-32 h-32 rounded-full" />
            <img src="/boss.png" alt="Boss" className="w-32 h-32 rounded-full" />
          </div>
          <Button onClick={closeDialog} className="mt-4">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}