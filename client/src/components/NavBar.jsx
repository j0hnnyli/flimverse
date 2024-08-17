import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-orange-400 text-white py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-center space-x-8">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/anime" className="hover:text-gray-300">Anime</Link>
                <Link to="/tv" className="hover:text-gray-300">TV Shows</Link>
                <Link to="/movies" className="hover:text-gray-300">Movies</Link>
            </div>
        </nav>
    );
}
  
  export default NavBar;
  