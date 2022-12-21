import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Homepage from './pages/homepage';
import MoviesPage from './pages/MoviesPage';
import WatchlistPage from './pages/watchlist';
import SeriesPage from './pages/SeriesPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/series' element={<SeriesPage />} />
        <Route path='/watchlist' element={<WatchlistPage />} />
        <Route path='/movie' element={<MoviesPage />} />
      </Routes>
    </div>
  );
}

export default App;
