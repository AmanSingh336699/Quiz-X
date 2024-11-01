import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const QuizContext = createContext()

export const QuizProvider = ({ children}) => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            if(!selectedGenre) return;
          try {
            const res = await axios.get(`https://quizapi.io/api/v1/questions?category=${selectedGenre}`, {
              headers: {
                'X-Api-Key': 'KUte8W8aOzeghaucoJNs79EaU7aEPkNpi786W94G'
              },
            })
            setQuestions(res.data)
          } catch (error) {
            console.error(error)
          }
        }
        fetchQuestions()
      },[selectedGenre])

      const handleAnswer = (answer) => {
        if(answer === questions[currentQuestion].correct_answer){
            setScore(score+1)
        }
        if(currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion+1)
        } else {
            setFinished(true)
        }
      }

      const calculatePercentage = () => {
        return questions.length > 0 ? (score/questions.length)*100 : 0;
      }

      const getResultMsg = () => {
        const percentage = calculatePercentage()
        if(percentage >= 90) return "Excellent Work!"
        if(percentage >= 60) return "you're doing good"
        return "keep trying!"
      }

    return(
        <QuizContext.Provider value={{
             setSelectedGenre,
             selectedGenre,
             questions, score, currentQuestion,
             calculatePercentage,
             getResultMsg, setFinished,
             finished, handleAnswer
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => 
    useContext(QuizContext)
