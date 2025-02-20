"use client"

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; // Import the Progress component
export interface QuizQuestion {  
  question: string;  
  options: string[];  
  correct_answer: string;  
  insight: string;  
  image: string; // Add image property
}  

export default function WisdomQuiz({ coins, onComplete, userId, itemId }: { onComplete: () => void, userId: string, itemId: number, coins: number }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<QuizQuestion[] | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/get-quiz?itemId=${itemId}`);
        if (!response.ok) throw new Error("Failed to fetch quiz");
        const result = await response.json();
        const createdQuizQuestions = result.data['quiz_questions'].map((quiz: { question: string, options: string[], correct_answer: string, insight: string, image: string }) => ({
          question: quiz.question,
          options: quiz.options,
          correct_answer: quiz.correct_answer,
          insight: quiz.insight,
          image: quiz.image // Include the image in the quiz question data
        }));
        setQuizData(createdQuizQuestions);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuizData();
  }, [itemId]);

  const handleAnswerSelect = (answer: string) => setSelectedAnswer(answer);

  const handleNextQuestion = async () => {
    if (quizData && selectedAnswer === quizData[currentQuestion].correct_answer) {
      setScore((prevScore) => prevScore + 1);
      await increaseSkillPoints();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, balance: coins, type: "reward" })
      });
    } catch (error) {
      console.error("Error increasing user balance:", error);
    }
  };

  const increaseSkillPoints = async () => {
    try {
      await fetch("/api/get-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      });
    } catch (error) {
      console.error("Error increasing skill points:", error);
    }
  };

  const handleFinishQuiz = () => onComplete();

  // Calculate progress percentage
  const progressPercentage = quizData ? ((currentQuestion + 1) / quizData.length) * 100 : 0;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Wisdom Quiz</CardTitle>
          <Progress value={progressPercentage} className="mb-4" />
        </CardHeader>
        {showResult ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl mb-2">Quiz Completed!</CardTitle>
              {quizData && <CardDescription className="text-lg">You scored {score} out of {quizData.length}</CardDescription>}
            </CardHeader>
            {quizData && (
              <CardContent>
                <p className="mb-4">Wisdom Insight:</p>
                <p className="italic">{quizData[currentQuestion].insight}</p>
              </CardContent>
            )}
            <CardFooter>
              <Button onClick={handleFinishQuiz}>Finish</Button>
            </CardFooter>
          </>
        ) : (
          quizData && (
            <>
              <CardHeader>
                <p>You will get 50 coins for answering these questions</p>
                <CardTitle className="text-2xl mb-2">Wisdom Riddle #{currentQuestion + 1}</CardTitle>
                <CardDescription className="text-lg">{quizData[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent>
                {quizData[currentQuestion].image && (
                  <img src={quizData[currentQuestion].image} alt={`Question ${currentQuestion + 1}`} className="mb-4 w-full h-auto rounded" />
                )}
                <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect}>
                  {quizData[currentQuestion].options.map((option, index) => (
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
        )}
      </Card>
    </div>,
    document.body
  );
}