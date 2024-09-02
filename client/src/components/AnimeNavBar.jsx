import { Link } from 'react-router-dom';

const AnimeNavBar = () => {
  return (
    <nav className="bg-flimverse_primary text-white py-2 px-4 fixed top-[82px] w-full z-40">
      <div className="flex items-center space-x-10">
        <Link to="/" className="hover:underline">
          Action
        </Link>
        <Link to="/" className="hover:underline">
          Mystery
        </Link>
        <Link to="/" className="hover:underline">
          Adventure
        </Link>
        <Link to="/" className="hover:underline">
          Categories
        </Link>
      </div>
    </nav>
  );
};

export default AnimeNavBar;
