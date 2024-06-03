import Navbar from './Navbar';
import HomeScreenImg from '../assets/screen.jpg';
const Home = () => {
  return (
    <>
    <div className='flex justify-between items-center bg-gray-800 h-14 px-3 text-white'>
    <div>Home</div>
        <Navbar/>
    </div>
    <div>
      <img src={HomeScreenImg} alt="" className='' loading='lazy'/>
      <div>
        <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-bold text-4xl font-extrabold text-blue-600'>REGISTER YOUR SELF</p>
      </div>
    </div>
    </>
  )
}

export default Home;