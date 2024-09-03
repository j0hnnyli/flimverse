import { useState, useEffect, useRef, useCallback} from "react";
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { backendUrl } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

const AnimeNavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchResultsRef = useRef(null);
  const searchBarRef = useRef(null);
  const [ query ] = useDebounce(searchInput, 500)

  const { pathname } = useLocation()
  const section = pathname === '/' ? 'animes' : pathname === '/tv' ? 'tvshows' : 'movies'

  const filteredResults = apiData?.filter((data) => {
    const matchMoiveName = data.original_title?.toLowerCase().includes(searchInput.toLowerCase())
    const matchShowsName = data.name?.toLowerCase().includes(searchInput.toLowerCase())
    const matchAnimeName = data.title?.toLowerCase().includes(searchInput.toLowerCase())

    return matchAnimeName || matchMoiveName || matchShowsName
  })

  const handleClickOutside = useCallback((event) => {
    if ( 
      searchResultsRef.current && !searchResultsRef.current.contains(event.target) || 
      searchBarRef.current && !searchBarRef.current.contains(event.target)
    ) {
      setSearchInput("");
      setIsError(false)
      setOpenSearchBar(false);
      setShowResults(false)
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if(!query) return;
      setIsLoading(true)

      try {  
        const response = await fetch(`${backendUrl}/${section}/${query}/1`);
        const  result  = await response.json(); 
        
        const dataName = section === 'animes' ? 'data' : 'results'

        
        if (result && result.data) {
          setApiData(result.data[dataName]);
        } else {
          setApiData([]);
        }
        
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setApiData([]);
        setIsLoading(false)
        console.error("Error fetching data:", error);
      }

    };

    fetchData();
  }, [query, section]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (!isLoading && !isError && apiData.length > 0 && searchInput.length > 0) {
      setShowResults(true);
    }
  }, [isLoading, isError, apiData, searchInput]);

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
            onChange={(e) => setSearchInput(e.target.value)}
            className={`peer cursor-pointer relative z-10 h-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out 
              ${openSearchBar ? "w-[300px] pr-12" : "w-12 pr-0"}
               border-white focus:pl-16 focus:pr-4 placeholder-white`}
            placeholder={`Search ${section} ...`}
          />

          {isLoading ? (
              <Loader className="animate-spin absolute inset-y-0 my-auto h-8 w-12"/>
            ) : (  
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
          )}
        </form>
      </div>

      {showResults && query && (
        <div
          ref={searchResultsRef}
          className="absolute top-14 left-0 mt-2 w-full bg-white text-black p-4 rounded shadow-lg max-h-[60vh] overflow-auto"
        >
          {!isError && !isLoading && (
              <p className="text-right -mt-3">Results : {filteredResults.length}</p>
            )
          }
          {isError && <p className="text-center text-red-500 text-lg">Sorry Network Error</p>}

          {filteredResults.length > 0 && filteredResults.map((data, i) => (
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
                  {data.vote_average?.toFixed(1) || data.score?.toFixed(1) }
                </div>
              </div>
            ))
          }
        </div>
      )}

    </nav>
  );
};

export default AnimeNavBar;
