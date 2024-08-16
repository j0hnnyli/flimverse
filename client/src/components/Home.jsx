import Logo from "./Logo"

const Home = () => {
  return (
    <div className="flex h-screen relative">
      <div className="absolute top-10 left-10 z-20 text-3xl text-orange-400 flex items-center"> 
        <span className="mr-2"> <Logo/> </span>
        <h1>FlimVerse</h1>
      </div>

      <div className="w-[33.33%] h-full animebg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-60"/>

        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">ANIMES</h1>
          <p className="text-white my-4">Explore the exciting world of Anime!</p>
          <button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button>
        </div>
      </div>

      <div className="w-[33.33%] h-full tvshowbg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-40"/>
        
        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">TV Shows</h1>
          <p className="text-white my-4">Explore the exciting world of TV Shows!</p>
          <button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button>
        </div>
      </div>

      <div className="w-[33.33%] h-full moviesbg relative flex items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-60"/>

        <div className="z-20 flex flex-col items-center justify-center">
          <h1 className="tracking-wide font-bold text-5xl text-orange-400">MOVIES</h1>
          <p className="text-white my-4">Explore the exciting world of Movies!</p>
          <button className="py-2 px-4 rounded-xl text-white bg-orange-400 hover:bg-orange-800"> Explore</button>
        </div>
      </div>

    </div>
  )
}

export default Home