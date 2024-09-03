import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AnimePage from './components/AnimePage'
import TVPage from './components/TVPage'
import MoviesPage from './components/MoviesPage'
import NavBar from './components/NavBar'
import AnimeNavBar from './components/AnimeNavBar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AnimeNavBar />
          <Routes>
            <Route path='/' element={ <AnimePage/> }/>
            <Route path='/tv' element={ <TVPage/> }/>
            <Route path='/movies' element={ <MoviesPage/> }/>
          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App