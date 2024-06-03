import React from 'react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
    <div className='flex justify-between items-center bg-slate-500 h-14 px-3 text-white'>
    <div>Home</div>
        <Navbar/>
    </div>
    </>
  )
}

export default Home