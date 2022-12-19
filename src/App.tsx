import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Homepage from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path='movie' element={<Homepage />} />
          <Route path='series' element={<Homepage />} />
          <Route path='watchlist' element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
