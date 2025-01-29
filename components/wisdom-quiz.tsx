"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { quizData, type QuizQuestion } from "@/lib/quiz-data"

export default function WisdomQuiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setShowResult(true)
    }
  }

  const handleFinishQuiz = () => {
    onComplete() // Notify parent component (Marketplace) that the quiz is done
  }

  const renderQuestion = (question: QuizQuestion) => (
    <>
      <CardHeader>
        <CardTitle className="text-2xl mb-2">Wisdom Riddle #{currentQuestion + 1}</CardTitle>
        <CardDescription className="text-lg">{question.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect}>
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
          {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardFooter>
    </>
  )

  const renderResult = () => (
    <>
      <CardHeader>
        <CardTitle className="text-2xl mb-2">Quiz Completed!</CardTitle>
        <CardDescription className="text-lg">
          You scored {score} out of {quizData.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Wisdom Insight:</p>
        <p className="italic">{quizData[currentQuestion].insight}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleFinishQuiz}>Finish</Button>
      </CardFooter>
    </>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {showResult ? renderResult() : renderQuestion(quizData[currentQuestion])}
    </Card>
  )
}
