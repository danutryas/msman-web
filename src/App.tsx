import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Homepage from './pages/homepage';
import MoviesPage from './pages/MoviesPage';
import ListPage from './pages/listPage';
import SeriesPage from './pages/SeriesPage';
import LoginPage from './pages/login';
import { useContext } from 'react';
import AuthContext from './context/Auth';

function App() {
  const {auth} = useContext(AuthContext)
  
  return (
    <div className="App">
      {
        auth.isAuth ? (
          <>
            <Header /> 
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path='/series' element={<SeriesPage />} />
              <Route path='/movie' element={<MoviesPage />} />
              <Route path='/list' element={<ListPage />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
