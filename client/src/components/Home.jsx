
const Home = () => {
  return (
    <div className="flex h-screen relative">

      <div className="w-[33.33%] h-full animebg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-60"/>

        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">ANIMES</h1>
          <p className="text-white my-4">Explore the exciting world of Anime!</p>
          <a href="/anime"><button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button></a>
        </div>
      </div>

      <div className="w-[33.33%] h-full tvshowbg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-40"/>
        
        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">TV Shows</h1>
          <p className="text-white my-4">Explore the exciting world of TV Shows!</p>
          <a href="/tv"><button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button></a>
        </div>
      </div>

      <div className="w-[33.33%] h-full moviesbg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-60"/>

        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">MOVIES</h1>
          <p className="text-white my-4">Explore the exciting world of Movies!</p>
          <a href="/movies"><button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button></a>
        </div>
      </div>

    </div>
  )
}

export default Home