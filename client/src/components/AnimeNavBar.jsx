import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const AnimeNavBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [apiData, setApiData] = useState([]);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const filteredResults = searchInput
    ? apiData.filter((item) =>
        Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      )
    : apiData;

  const handleClickOutside = useCallback((event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setSearchInput('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav className="bg-flimverse_primary text-white py-2 px-4 fixed top-[82px] w-full z-40 flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <Link to="/" className="hover:underline">Action</Link>
        <Link to="/" className="hover:underline">Mystery</Link>
        <Link to="/" className="hover:underline">Adventure</Link>
        <Link to="/" className="hover:underline">Categories</Link>
      </div>

      <div className="relative flex items-center">
        <form className="relative">
          <input
            type="search"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => searchItems(e.target.value)}
            className={`peer cursor-pointer relative z-10 h-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out ${searchInput ? 'w-48 pr-12' : 'w-12 pr-0'} border-white focus:border-white focus:pl-16 focus:pr-4 placeholder-white`}
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

      {searchInput && (
        <div
          ref={searchResultsRef}
          className="absolute top-full left-0 mt-2 w-full bg-white text-black p-4 rounded shadow-lg"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div key={item.id} className="mb-2">
                <p className="font-bold">{item.name}</p>
                <p>{item.email}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </nav>
  );
};

export default AnimeNavBar;
