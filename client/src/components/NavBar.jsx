import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    // NavigationMenuLink,
  } from "@/components/ui/navigation-menu"

const NavBar = () => {
    const [index, setIndex] = useState(0);

    const slides = [
      {
        name: 'Animes',
        img: '/animebg.webp',
        path: '/',
      },
      {
        name: 'TV-Shows',
        img: '/tvshowbg.jpg',
        path: '/tv'
      },
      {
        name: 'Movies',
        img: '/moviesbg.jpg',
        path: '/movies'
      }
    ]

    return (
        <nav 
            className='flex items-center justify-between px-6 py-4  text-flimverse_primary fixed top-0 z-50 w-full bg-flimverse_secondary'
        >
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-xl bg-flimverse_primary text-white w-[150px]">
                        {slides[index].name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-4 bg-flimverse_secondary text-white rounded-lg border-none">
                        {slides.map((slide, i) => (
                        <Link
                            to={slide.path}
                            key={i}
                            className='flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer mb-2'
                            onClick={() => setIndex(i)}
                        >
                            <div 
                                style={{ backgroundImage: `url(${slide.img})` }}
                                className={`w-[50px] h-[50px] bg-center bg-cover ${index === i ? 'border-flimverse_primary border-2' : ''}`} 
                            ></div>
                            <span className="text-lg">{slide.name}</span>
                        </Link>
                        ))}
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu> 

            <div className="text-xl text-flimverse_primary flex items-center">
                <span className="mr-2">
                <Logo />
                </span>
                <h1>FlimVerse</h1>
            </div>

            <Link to='/mywatchlist'>My List</Link>
        </nav>
    );
}
  
  export default NavBar;
  