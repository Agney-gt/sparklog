export interface QuizQuestion {  
  question: string;  
  options: string[];  
  correctAnswer: string;  
  insight: string;  
}  

export const quizData: QuizQuestion[] = [  
  {  
      question: "What truly determines a person's impact on others?",  
      options: [  
          "Wealth and status",  
          "Personal character and actions",  
          "Academic achievements",  
          "Social media followers"  
      ],  
      correctAnswer: "Personal character and actions",  
      insight: "Your true influence comes from walking with wise companions and allowing their wisdom to shape your actions and thoughts."  
  },  
  {  
      question: "How does genuine wisdom come to a person?",  
      options: [  
          "Through arrogant self-study",  
          "By mocking existing wisdom",  
          "Easily to those who are discerning",  
          "By avoiding learning opportunities"  
      ],  
      correctAnswer: "Easily to those who are discerning",  
      insight: "Knowledge comes most easily to the discerning. Actively seeking wisdom through actions like reading, learning, and problem-solving enhances your understanding and ability to solve challenges effectively."  
  },  
  {  
      question: "What is the wisest approach to resolving disagreements?",  
      options: [  
          "Escalating arguments quickly",  
          "Avoiding all confrontation",  
          "Dropping the matter before it becomes a dispute",  
          "Winning at all costs"  
      ],  
      correctAnswer: "Dropping the matter before it becomes a dispute",  
      insight: "True wisdom involves knowing when to step back and prevent conflicts from escalating."  
  },  
  {  
      question: "How are a person's true qualities revealed?",  
      options: [  
          "During times of comfort",  
          "Through challenging circumstances",  
          "By their social media presence",  
          "Through their wealth"  
      ],  
      correctAnswer: "Through challenging circumstances",  
      insight: "Character is forged in difficult moments, not during times of ease."  
  },  
  {  
      question: "What gives words their true power?",  
      options: [  
          "Volume and intensity",  
          "Graciousness and wisdom",  
          "Frequency of speech",  
          "Technical complexity"  
      ],  
      correctAnswer: "Graciousness and wisdom",  
      insight: "Thoughtful, kind words have more impact than loud or harsh communication."  
  },  
  {  
      question: "What is the deepest expression of love?",  
      options: [  
          "Giving expensive gifts",  
          "Covering over offenses",  
          "Avoiding all conflicts",  
          "Proving oneself right"  
      ],  
      correctAnswer: "Covering over offenses",  
      insight: "True love involves forgiveness and understanding, not keeping score of wrongs."  
  }  
];