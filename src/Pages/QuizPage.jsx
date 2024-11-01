import React, { useEffect, useState } from 'react'
import { useQuiz } from '../QuizContextApi/QuizContext'

function QuizPage() {
    const {calculatePercentage, questions,
        currentQuestion,
        handleAnswer, finished,
        getResultMsg, score} = useQuiz()
    
        const [timer, setTimer] = useState(30)
        const [isTimup, setIsTimeUp] = useState(false)

        useEffect(() => {
            if(timer > 0 && !finished){
                const timerId = setInterval(() => {
                    setTimer(prev => prev-1)
                }, 1000)
                return () => clearInterval(timerId)
            } else if(timer === 0) {
                setIsTimeUp(true)
                handleAnswer(null) 
            }
        }, [timer, finished])

        const handleOptionClick = (answer) => {
            handleAnswer(answer)
            setTimer(30)
            setIsTimeUp(false)
        }

        if(finished){
            return(
                <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200'>
                    <h2 className='text-2xl font-semibold mb-4'>Quiz Finished</h2>
                    <p className='text-lg'>Your Score: {score}/{questions.length}
                        ({calculatePercentage().toFixed(2)}%)
                    </p>
                    <p className='text-lg'>{getResultMsg()}</p>
                    <button onClick={() => window.location.reload()} className='bg-blue-400 text-white p-2 rounded mt-4 hover:bg-sky-600'>Restart Quiz</button>
                </div>
            )
        }

        if(!questions.length){
            return <div className='flex justify-center items-center min-h-screen'>
                Loading...
            </div>
        }

        const currentQuestionIndex = questions[currentQuestion]


  return (
    <div className='flex flex-col items-center justify-center bg-emerald-200 p-4 min-h-screen'>
        <h2 className='text-2xl font-semibold mb-4'>Question {currentQuestion + 1}/{questions.length}</h2>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-4'>
            <h3 className='text-lg mb-4'>{currentQuestionIndex.question}</h3>
            <div className='grid gap-2'>
                {currentQuestionIndex.answers && typeof currentQuestionIndex.answers === 'object' ? Object.values(currentQuestionIndex.answers).map((answer, index) => (
                    answer && (
                        <button key={index} onClick={() => handleOptionClick(answer)} className='bg-sky-300 text-white p-2 rounded hover:bg-sky-600'>{answer}</button>
                    )
                )) : null}
            </div>
        </div>
        <div className='w-full max-w-md'>
            <p className='text-lg'>Time Remaining: {timer} seconds</p>
            <div className='h-2 bg-gray-300 rounded'>
                <div className='h-full bg-sky-500 rounded' style={{width: `${(timer/30)*100}%`}}></div>
            </div>
        </div>
        {isTimup && <p className='text-red-600'>Time's up! You missed this question</p>}
    </div>
  )
}

export default QuizPage

