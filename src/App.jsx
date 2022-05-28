import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { UserContext, UserProvider } from './context/UserContext';
import ConnectWallet from './pages/ConnectWallet/ConnectWallet';
import CreateNftSelector from './pages/CreateNftSelector/CreateNftSelectior';
import CreateNftSingle from './pages/CreateNftSingle/CreateNftSingle';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const { isLogin } = useContext(UserContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/connect-wallet' element={<ConnectWallet />} />
          <Route path='/create-nft' element={<CreateNftSelector />} />
          <Route path='/create-nft/single-item' element={<CreateNftSingle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
