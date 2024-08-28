import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import AnimePage from './components/AnimePage'
import TVPage from './components/TVPage'
import MoviesPage from './components/MoviesPage'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/anime' element={ <AnimePage/> }/>
            <Route path='/tv' element={ <TVPage/> }/>
            <Route path='/movies' element={ <MoviesPage/> }/>
          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App