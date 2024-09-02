import AnimeNavBar from './AnimeNavBar';

const AnimePage = () => {
  return (
    <div className="relative">
      <AnimeNavBar />
      <div className="flex items-center justify-center h-screen bg-gray-100" style={{ backgroundImage: 'url(/animebg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <h1 className="text-4xl font-bold text-white text-center">Hello World of Anime</h1>
      </div>
    </div>
  );
};

export default AnimePage;
