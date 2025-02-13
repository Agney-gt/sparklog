"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ReplyIcon, Hash, Scissors, HelpCircle, ImageIcon } from "lucide-react"
import { ThreadPreview } from "./thread-preview"

interface Tweet {
  content: string
  imageFile?: File
}

const NGROK_URL = "https://d75c-2405-201-6802-1058-989c-2545-90f-dc63.ngrok-free.app"

export function ThreadComposer() {
  const [content, setContent] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null)
  const [isPosting, setIsPosting] = useState(false)

  const handleAddTweet = () => {
    if (content.trim() || currentImageFile) {
      setTweets([...tweets, { content, imageFile: currentImageFile || undefined }])
      setContent("")
      setCurrentImageFile(null)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    try {
      setIsPosting(true)
      const formData = new FormData()
      // Ensure there is at least one tweet before submitting
       if (tweets.length === 0) {
      console.error("No tweets to post")
      return
      }
      // Send only the tweets
      formData.append("text", tweets.map(tweet => tweet.content).join("\n\n")) // Combine tweets into one string

      tweets.forEach((tweet, index) => {
        formData.append(`tweets[${index}][content]`, tweet.content)
        if (tweet.imageFile) {
          formData.append(`tweets[${index}][imageFile]`, tweet.imageFile)
        }
      })

      const response = await fetch(`${NGROK_URL}/api/thread`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to post thread")

      const data = await response.json()
      console.log("Thread posted:", data)
      setTweets([])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-4 overflow-x-auto">
          <Button variant="ghost" size="sm">
            <ReplyIcon className="h-4 w-4 mr-2" />
            Reply to a tweet
          </Button>
          <Button variant="ghost" size="sm">
            <Hash className="h-4 w-4 mr-2" />
            Numbering
          </Button>
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button variant="ghost" size="sm" asChild>
              <span>
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Image
              </span>
            </Button>
          </label>
          <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <Button variant="ghost" size="sm">
            <Scissors className="h-4 w-4 mr-2" />
            Split
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Tips & tricks
          </Button>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your tweet..."
          className="min-h-[150px]"
        />
        {currentImageFile && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Image selected: {currentImageFile.name}</p>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-500">{content.length} characters</div>
          <Button onClick={handleAddTweet}>Add Tweet</Button>
        </div>
      </Card>
      <Card className="p-4">
        <ThreadPreview tweets={tweets} />
        <div className="mt-4">
          <Button className="w-full" onClick={handleSubmit} disabled={tweets.length === 0 || isPosting}>
            {isPosting ? "Posting..." : "Share on Twitter now"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
