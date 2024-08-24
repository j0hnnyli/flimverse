import { useState } from "react"
import Logo from "./Logo"
import { Link } from 'react-router-dom'



const Home = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      name: 'Animes',
      url: '/animebg.webp'
    },
    {
      name: 'Tv-Shows',
      url: '/tvshowbg.jpg'
    },
    {
      name: 'Movies',
      url: '/moviesbg.jpg'
    }
  ]

  const backgroundImg = {
    backgroundImage: `url(${slides[index].url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  return (
    <div 
      style={backgroundImg}
      className="flex h-screen relative"
    >
      <div className="absolute w-full h-full bg-black opacity-35"></div>

      <div className="absolute bottom-10 right-10 z-20 text-3xl text-orange-400 flex items-center"> 
        <span className="mr-2"> <Logo/> </span>
        <h1>FlimVerse</h1>
      </div>

      <div className="absolute top-10 left-10 text-orange-400 text-4xl tracking-wide">
        {slides[index].name}
      </div>

      <div className="flex flex-col justify-center gap-5 bottom-10 left-10 absolute">
        <div className="flex items-center">
          <div 
            onClick={() => setIndex(0)} 
            className={`w-[100px] h-[100px] animebg cursor-pointer ${index === 0 && 'border-orange-400 border-2'}`}
          ></div>
          {index === 0 && <Link className="text-xl ml-5 py-2 px-4 bg-orange-400 text-white rounded-xl">Explore</Link>}
        </div>

        <div className="flex items-center">
          <div 
            onClick={() => setIndex(1)} 
            className={`w-[100px] h-[100px] tvshowbg cursor-pointer ${index === 1 && 'border-orange-400 border-2'}`}
          ></div>
          {index === 1 && <Link className="text-xl ml-5 py-2 px-4 bg-orange-400 text-white rounded-xl">Explore</Link>}
        </div>

        <div className="flex items-center">
          <div 
            onClick={() => setIndex(2)} 
            className={`w-[100px] h-[100px] moviesbg cursor-pointer ${index === 2 && 'border-orange-400 border-2'}`}
          ></div>
          {index === 2 && <Link className="text-xl ml-5 py-2 px-4 bg-orange-400 text-white rounded-xl">Explore</Link>}
        </div>

      </div>
      

    </div>
  )
}

export default Home