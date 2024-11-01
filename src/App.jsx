import React, { useEffect } from 'react'
import { QuizProvider } from './QuizContextApi/QuizContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import QuizPage from './Pages/QuizPage'
import axios from 'axios'

function App() {
  useEffect(() => {
    const fetchQuestions = async () => {
        // if(!selectedGenre) return;
      try {
        const res = await axios.get(`https://quizapi.io/api/v1/categories`, {
          headers: {
            'X-Api-Key': 'KUte8W8aOzeghaucoJNs79EaU7aEPkNpi786W94G'
          },
        })
        // setQuestions(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchQuestions()
  },[])

  
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/quiz' element={<QuizPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  )
}

export default App