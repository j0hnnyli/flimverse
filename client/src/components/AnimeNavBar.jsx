import { useState, useEffect, useRef, useCallback} from "react";
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { backendUrl } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const AnimeNavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const [apiData, setApiData] = useState([]);
  const searchResultsRef = useRef(null);
  const searchBarRef = useRef(null);
  const [query] = useDebounce(searchInput, 200)

  const { pathname } = useLocation()
  const section = pathname === '/' ? 'animes' : pathname === '/tv' ? 'tvshows' : 'movies'

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const filteredResults = apiData?.filter((data) => {
    const matchMoiveName = data.original_title?.toLowerCase().includes(searchInput.toLowerCase())
    const matchShowsName = data.name?.toLowerCase().includes(searchInput.toLowerCase())
    const matchAnimeName = data.title?.toLowerCase().includes(searchInput.toLowerCase())

    return matchAnimeName || matchMoiveName || matchShowsName
  })
  
  useEffect(() => {
    const fetchData = async () => {
      if(!query || searchInput.length === 0) return;

      try {
        const response = await fetch(`${backendUrl}/${section}/${searchInput}/1`);
        const { data } = await response.json(); 
        
        const dataName = section === 'animes' ? 'data' : 'results'
        
        setApiData(data[dataName] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, searchInput, section]);

  const handleClickOutside = useCallback((event) => {
    if ( searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setSearchInput("");
    }

    if(searchBarRef.current && !searchBarRef.current.contains(event.target)){
      setOpenSearchBar(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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

      <div className="flex items-center">
        <form className="">
          <input
            ref={searchBarRef}
            type="search"
            aria-label="Search"
            value={searchInput}
            onClick={() => setOpenSearchBar(true)}
            onChange={(e) => searchItems(e.target.value)}
            className={`peer cursor-pointer relative z-10 h-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out ${
              openSearchBar ? "w-[300px] pr-12" : "w-12 pr-0"
            } border-white focus:border-white focus:pl-16 focus:pr-4 placeholder-white`}
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

      {query && searchInput ? (
        <div
          ref={searchResultsRef}
          className="absolute top-14 left-0 mt-2 w-full bg-white text-black p-4 rounded shadow-lg max-h-[50vh] overflow-auto"
        >
          {filteredResults.length > 0 && (
              filteredResults.map((data, i) => (
                <div 
                  key={i} 
                  className="mb-7 p-4 flex items-center justify-between gap-5 w-[85%] mx-auto border-b hover:bg-gray-200"
                >
                  <div className="w-[150px] h-[200px]">
                    <img 
                      alt={data.original_title || data.title || data.name} 
                      src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : data.images?.jpg.image_url} 
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  <div className="w-[50%]">
                    <p className="text-xl">{data.original_title || data.title || data.name}</p>
                    <p className="text-sm"> {data.overview?.slice(0, 100) || data.synopsis?.slice(0, 100)} . . .</p>
                  </div>

                  <div className="border p-2 rounded-lg bg-flimverse_secondary text-white">
                    {data.vote_average?.toFixed(1) || data.score}
                  </div>
                </div>
              ))
            ) 
          }
        </div>
      ) : (
        <p>No results found</p>
      )}

    </nav>
  );
};

export default AnimeNavBar;
