// Libraries
import { useContext, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork  } from '@solana/wallet-adapter-base';
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolflareWalletAdapterConfig,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

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
import Auctions from "./pages/Auctions/Auctions";
import Profile from "./pages/Profile/ProfileMain";

require('@solana/wallet-adapter-react-ui/styles.css');


function App(props: any): JSX.Element {
  const { isLogin } = useContext(UserContext);

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


  
  //@ts-ignore
  const wallets = useMemo(
        () => [
            new PhantomWalletAdapter({ network }),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter(),
        ],
        [network]
    );


  return (
    <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} >
                <WalletModalProvider>
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
                          <Route path="/connect-wallet" element={<ConnectWallet near={props} />} />
                          <Route path="/create-nft" element={<CreateNftSelector />} />
                          <Route path="/create-nft/single-item" element={<CreateNftSingle near={props}  />} />
                          <Route path="/stats/ranking" element={<Ranking />} />
                          <Route path="/stats/activity" element={<Activity />} />
                          <Route path="/explore" element={<Explore />} />
                          <Route path="/marketplace" element={<MarketPlace near={props} />} />
                          <Route path="/create-store" element={<CreateStore />} />
                          <Route path="/all-nfts" element={<AllNFTs />} />
                          <Route path="/auctions" element={<Auctions />} />
                          <Route path="/profile/*" element={<Profile near={props} />} />
                        </Routes>
                        <Footer />
                      </BrowserRouter>    
                    </div>
                </WalletModalProvider>
            </WalletProvider>
    </ConnectionProvider>

    
  );
};

export default App;
