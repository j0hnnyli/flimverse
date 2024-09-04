import { Routes, Route, BrowserRouter } from "react-router-dom";
import AnimePage from "./components/AnimePage";
import TVPage from "./components/TVPage";
import MoviesPage from "./components/MoviesPage";
import GlobalNavbar from "./components/navbars/GlobalNavBar";
import InnerNavBar from "./components/navbars/InnerNavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalNavbar />
        <InnerNavBar />
        <Routes>
          <Route path="/" element={<AnimePage />} />
          <Route path="/tv" element={<TVPage />} />
          <Route path="/movies" element={<MoviesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
