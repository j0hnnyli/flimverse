import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
    const { pathname } = useLocation();
    console.log(pathname)
      
    return (
        <nav 
            className={
                `flex items-center justify-between px-6 py-3  text-orange-400 fixed top-0 z-50 w-full
                ${pathname !== '/' && 'bg-black'}
                `
            }
        >
            <div className="text-2xl flex items-center"> 
                <span className="mr-2"> <Logo/> </span>
                <Link to='/'>FilmVerse</Link>
            </div>

            <div className="flex items-center justify-center space-x-8">
                <Link to="/anime" className="hover:text-gray-300 hover:border-b border-orange-400">Anime</Link>
                <Link to="/tv" className="hover:text-gray-300 hover:border-b border-orange-400">TV Shows</Link>
                <Link to="/movies" className="hover:text-gray-300 hover:border-b border-orange-400">Movies</Link>
            </div>
        </nav>
    );
}
  
  export default NavBar;
  