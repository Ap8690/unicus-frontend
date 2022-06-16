// Libraries
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext, UserProvider } from "./context/UserContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

//utils
import ScrollToTop from "./utils/ScrollToTop";

// Pages
import ConnectWallet from "./pages/ConnectWallet/ConnectWallet";
import CreateNftSelector from "./pages/CreateNftSelector/CreateNftSelectior";
import CreateNftSingle from "./pages/CreateNftSingle/CreateNftSingle";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Blog from "./pages/Blog/BlogMain";
import ReadBlog from "./pages/ReadBlog/ReadBlog";
import Ranking from "./pages/Ranking/Ranking";
import Activity from "./pages/Activity/Activity";
import Explore from "./pages/Explore/Explore";
import MarketPlace from "./pages/Marketplace/MarketPlace";
import CreateStore from "./pages/CreateStore/CreateStore";
import AllNFTs from "./pages/AllNFTs/AllNFTs";

const App = () => {
  const { isLogin } = useContext(UserContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/readblog/:id" element={<ReadBlog />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/create-nft" element={<CreateNftSelector />} />
          <Route path="/create-nft/single-item" element={<CreateNftSingle />} />
          <Route path="/stats/ranking" element={<Ranking />} />
          <Route path="/stats/activity" element={<Activity />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/all-nfts" element={<AllNFTs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
