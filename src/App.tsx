import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Homepage from './Homepage/homepage';
import MoviesPage from './Movie/MoviesPage';
import ListPage from './UserList/listPage';
import SeriesPage from './Series/SeriesPage';
import LoginPage from './Login/login';
import { useContext } from 'react';
import AuthContext from './Auth/Auth';

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
            {/* <Route path="/" element={<Navigate to="/login"/>} /> */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
