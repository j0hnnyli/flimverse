import  PropTypes  from 'prop-types'
import { forwardRef } from 'react'

const SearchDisplay = (
  {showResults, query, isError, isLoading, filteredResults}, 
  ref
) => {

  return (
    <>
      {showResults && query && (
        <div
          ref={ref}
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
    </>
  )
}

SearchDisplay.propTypes = {
  showResults: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filteredResults: PropTypes.array.isRequired,
}

export default forwardRef(SearchDisplay)