import { useState } from 'react';
import { Link } from 'react-router-dom';

const AnimeNavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-flimverse_primary text-white py-2 px-4 fixed top-[82px] w-full z-40 flex items-center justify-between">
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

      <div className="relative flex items-center">
        <form className="relative">
          <input
            type="search"
            aria-label="Search"
            className={`peer cursor-pointer relative z-10 h-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out ${
              isSearchOpen ? 'w-48 pr-12' : 'w-12 pr-0'
            } border-white focus:border-white focus:pl-16 focus:pr-4 placeholder-white`}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
            placeholder="Search..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 peer-focus:border-white peer-focus:stroke-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
    </nav>
  );
};

export default AnimeNavBar;
