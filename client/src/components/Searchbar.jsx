import { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'
import { Loader } from "lucide-react";

const Searchbar =({
  searchInput, setOpenSearchBar, setSearchInput,
  openSearchBar, isLoading, section }
) => {
  const searchBarRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      (searchBarRef.current && !searchBarRef.current.contains(event.target))
    ) {
      setSearchInput("");
      setOpenSearchBar(false);
    }
  }, [setOpenSearchBar, setSearchInput]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
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
            <Loader className="animate-spin absolute inset-y-0 my-auto h-8 w-12" />
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
  )
}

Searchbar.propTypes = {
  searchInput : PropTypes.string.isRequired,
  isLoading : PropTypes.bool.isRequired,
  section: PropTypes.string.isRequired,
  openSearchBar: PropTypes.bool.isRequired,
  setOpenSearchBar: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired
}

export default Searchbar