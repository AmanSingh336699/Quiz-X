import React from 'react'
import { useQuiz } from '../QuizContextApi/QuizContext'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Link } from 'react-router-dom'

function HomePage() {
    const { setSelectedGenre, selectedGenre } = useQuiz()

    const handleGenres = (genre) => {
        setSelectedGenre(genre)
    }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
        <Header />
        <main className='flex-grow flex flex-col items-center justify-start p-6 text-center'>
            <h2 className='text-2xl font-semibold mb-4'>Welcome to Quiz-X</h2>
            <p className='mb-4'>Test your knowledge with our fun quizzes on various topics!</p>
            <div className='grid grid-cols-2 gap-2 mb-6 md:grid-cols-4'>
                <button className='bg-yellow-300 text-white p-4 rounded hover:bg-yellow-500' onClick={() => handleGenres('Linux')}>Linux</button>
                <button className='bg-red-300 text-white p-4 rounded hover:bg-red-500' onClick={() => handleGenres('SQL')}>SQL</button>
                <button className='bg-fuchsia-300 text-white p-4 rounded hover:bg-fuchsia-500' onClick={() => handleGenres('CMS')}>CMS</button>
                <button className='bg-green-300 text-white p-4 rounded hover:bg-green-500' onClick={() => handleGenres('Docker')}>Docker</button>
                <button className='bg-orange-300 text-white p-4 hover:bg-orange-500 rounded' onClick={() => handleGenres('bash')}>Bash</button>
                <button className='bg-emerald-300 text-white p-4 rounded hover:bg-emerald-500' onClick={() => handleGenres('DevOps')}>DevOps</button>
                <button className='bg-cyan-300 text-white p-4 rounded hover:bg-cyan-500' onClick={() => handleGenres('Code')}>Code</button>
                <button className='bg-rose-300 text-white p-4 rounded hover:bg-rose-500' onClick={() => handleGenres('uncategorized')}>uncategorized</button>
            </div>
            {selectedGenre && <p className='mb-4 text-lg text-gray-700'>
                You Selected: <strong>{selectedGenre}</strong></p>}
                <Link to='/quiz' className={`bg-blue-500 text-white p-4 rounded ${!selectedGenre ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}>Start Quiz</Link>
        </main>
        <Footer />
    </div>
  )
}

export default HomePage