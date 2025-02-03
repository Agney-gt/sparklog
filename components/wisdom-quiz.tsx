"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { type QuizQuestion } from "@/lib/quiz-data"

export default function WisdomQuiz({coins, onComplete, userId, itemId }: { onComplete: () => void, userId: string, itemId: number, coins:number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizData, setQuizData] = useState<QuizQuestion[] | null>(null);
  const getQuiz = async (itemId: number) => {
    try {

      const response = await fetch(`/api/get-quiz?itemId=${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch quiz");
      }
  
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };
  useEffect(() => {
    const fetchQuizData = async () => {
      const data = await getQuiz(itemId);
      const createdQuizQuestions = data['quiz_questions'].map((quiz: { question: string, options: string[], correct_answer: string, insight: string }) =>
        createQuizQuestion(
          quiz.question,
          quiz.options,
          quiz.correct_answer,
          quiz.insight
        )
      );
      setQuizData(createdQuizQuestions);
      
      
      
    };
    fetchQuizData();
  }, [itemId]);
  // Function to create a quiz question  
  const createQuizQuestion = (  
    question: string,  
    options: string[],  
    correct_answer: string,  
    insight: string  
  ): QuizQuestion => ({  
    question,  
    options,  
    correct_answer,  
    insight,  
  });  
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (quizData && selectedAnswer === quizData[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  
    if (quizData && currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowResult(true);
      increaseUserBalance();
    }
  };

  const increaseUserBalance = async () => {
    try {
      await fetch("/api/marketplace/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, balance:coins, type:"reward"}),
      })
    } catch (error) {
      console.error("Error increasing user balance:", error)
    }
  }
  
  
  const handleFinishQuiz = () => {
    onComplete() // Notify parent component (Marketplace) that the quiz is done
  }

  const renderQuestion = (question: QuizQuestion) => (
    <>
      <CardHeader>
        <p>You will get 50 coins for answering these questions</p>
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
          {quizData && currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardFooter>
    </>
  )

  const renderResult = () => (
    <>
      <CardHeader>
        <CardTitle className="text-2xl mb-2">Quiz Completed!</CardTitle>
        {quizData && (
          <CardDescription className="text-lg">
            You scored {score} out of {quizData.length}
          </CardDescription>
        )}
      </CardHeader>
      {quizData && (
        <CardContent>
          <p className="mb-4">Wisdom Insight:</p>
          <p className="italic">{quizData[currentQuestion].insight}</p>
        </CardContent>)}
        <CardFooter>
        <Button onClick={handleFinishQuiz}>Finish</Button>
      </CardFooter>
    </>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {showResult ? renderResult() : quizData && renderQuestion(quizData[currentQuestion])}
    </Card>
  )
}
