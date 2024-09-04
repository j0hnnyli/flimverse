import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { backendUrl } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import SearchDisplay from "../SearchDisplay";
import Searchbar from "../Searchbar";

const InnerNavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [query] = useDebounce(searchInput, 500);

  const { pathname } = useLocation();
  const section =
    pathname === "/" ? "animes" : pathname === "/tv" ? "tvshows" : "movies";

  const filteredResults = apiData?.filter((data) => {
    const matchMoiveName = data.original_title
      ?.toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchShowsName = data.name
      ?.toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchAnimeName = data.title
      ?.toLowerCase()
      .includes(searchInput.toLowerCase());

    return matchAnimeName || matchMoiveName || matchShowsName;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setIsLoading(true);

      try {
        const response = await fetch(`${backendUrl}/${section}/${query}/1`);
        const result = await response.json();

        const dataName = section === "animes" ? "data" : "results";

        if (result && result.data) {
          setApiData(result.data[dataName]);
        } else {
          setApiData([]);
        }

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setApiData([]);
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, section]);

  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      apiData.length > 0 &&
      query
    ) {
      setShowResults(true);
    }
  }, [isLoading, isError, apiData, query]);

  return (
    <nav className={`
      ${ section == 'animes' && 'bg-flimverse_anime_primary' }
      ${ section == 'tvshows' && 'bg-flimverse_shows_primary' }
      ${ section == 'movies' && 'bg-flimverse_movies_primary' }
      text-white py-2 px-4 fixed top-[82px] w-full z-40 flex items-center justify-between
    `}>
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

      <Searchbar
        searchInput={searchInput}
        setOpenSearchBar={setOpenSearchBar}
        setSearchInput={setSearchInput}
        openSearchBar={openSearchBar}
        isLoading={isLoading}
        section={section}
      />

      <SearchDisplay
        setShowResults={setShowResults}
        setIsError={setIsError}
        filteredResults={filteredResults}
        showResults={showResults}
        query={query}
        isError={isError}
        isLoading={isLoading}
      />
    </nav>
  );
};

export default InnerNavBar;
