import { useState } from "react"
import Logo from "./Logo"
import { Link } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"


const Home = () => {
  const [index, setIndex] = useState(0);

const Home = () => {


  const slides = [
    {
      name: 'Animes',
      url: '/animebg.webp'
    },
    {
      name: 'TV-Shows',
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
    <div style={backgroundImg} className="flex h-screen relative">
      <div className="absolute w-full h-full bg-black opacity-35"></div>

      <div className="absolute bottom-10 right-10 z-20 text-3xl text-orange-400 flex items-center">
        <span className="mr-2">
          <Logo />
        </span>
        <h1>FlimVerse</h1>
      </div>

      <div className="absolute top-10 left-10 z-20">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xl bg-orange-400 text-white">
                {slides[index].name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 bg-gray-800 text-white rounded-lg">
                {slides.map((slide, i) => (
                  <Link
                    to={slide.link}
                    key={i}
                    className='flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer mb-2'
                    onClick={() => setIndex(i)}
                  >
                    <div className={`w-[50px] h-[50px] bg-center bg-cover ${index === i ? 'border-orange-400 border-2' : ''}`} style={{ backgroundImage: `url(${slide.url})` }}></div>
                    <span className="text-lg">{slide.name}</span>
                  </Link>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Home