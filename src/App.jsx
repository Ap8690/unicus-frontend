import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Homepage from './pages/Homepage/Homepage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
