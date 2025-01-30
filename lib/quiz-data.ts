export interface QuizQuestion {  
  question: string;  
  options: string[];  
  correctAnswer: string;  
  insight: string;  
}  

// Function to create a quiz question  
const createQuizQuestion = (  
  question: string,  
  options: string[],  
  correctAnswer: string,  
  insight: string  
): QuizQuestion => ({  
  question,  
  options,  
  correctAnswer,  
  insight,  
});  

// Array of quiz questions data  
export const quizDatas: QuizQuestion[] = [  
  createQuizQuestion(  
      "What truly determines a person's impact on others?",  
      [  
          "Wealth and status",  
          "Personal character and actions",  
          "Academic achievements",  
          "Social media followers"  
      ],  
      "Personal character and actions",  
      "Your true influence comes from walking with wise companions and allowing their wisdom to shape your actions and thoughts."  
  ),  
  createQuizQuestion(  
      "How does genuine wisdom come to a person?",  
      [  
          "Through arrogant self-study",  
          "By mocking existing wisdom",  
          "Easily to those who are discerning",  
          "By avoiding learning opportunities"  
      ],  
      "Easily to those who are discerning",  
      "Knowledge comes most easily to the discerning. Actively seeking wisdom through actions like reading, learning, and problem-solving enhances your understanding and ability to solve challenges effectively."  
  ),  
  createQuizQuestion(  
      "What is the wisest approach to resolving disagreements?",  
      [  
          "Escalating arguments quickly",  
          "Avoiding all confrontation",  
          "Dropping the matter before it becomes a dispute",  
          "Winning at all costs"  
      ],  
      "Dropping the matter before it becomes a dispute",  
      "True wisdom involves knowing when to step back and prevent conflicts from escalating."  
  ),  
  createQuizQuestion(  
      "How are a person's true qualities revealed?",  
      [  
          "During times of comfort",  
          "Through challenging circumstances",  
          "By their social media presence",  
          "Through their wealth"  
      ],  
      "Through challenging circumstances",  
      "Character is forged in difficult moments, not during times of ease."  
  ),  
  createQuizQuestion(  
      "What gives words their true power?",  
      [  
          "Volume and intensity",  
          "Graciousness and wisdom",  
          "Frequency of speech",  
          "Technical complexity"  
      ],  
      "Graciousness and wisdom",  
      "Thoughtful, kind words have more impact than loud or harsh communication."  
  ),  
  createQuizQuestion(  
      "What is the deepest expression of love?",  
      [  
          "Giving expensive gifts",  
          "Covering over offenses",  
          "Avoiding all conflicts",  
          "Proving oneself right"  
      ],  
      "Covering over offenses",  
      "True love involves forgiveness and understanding, not keeping score of wrongs."  
  )  
];