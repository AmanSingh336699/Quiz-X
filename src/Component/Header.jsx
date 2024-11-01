import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-sky-500 text-white p-4 text-center'>
        <h1 className='text-3xl font-bold'>Quiz-X</h1>
        <nav className='mt-2'>
            <Link to="/" className="mx-2 hover:underline">Home</Link>
            <Link to="/about" className="mx-2 hover:underline">About</Link>
            <Link to="/quiz" className="mx-2 hover:underline">Start Quiz</Link>
        </nav>
    </header>
  )
}

export default Header