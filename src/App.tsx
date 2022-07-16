// Libraries
import { useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { IStore } from "./models/Store";
import ViewNft from "./pages/ViewNft/ViewNft";
import StoreHomepage from "./pages/StoreHomepage/StoreHomepage";
import StoreSettings from "./pages/StoreSettings/StoreSettings";
// import NFTById from "./components/NFTById/NFTById";

require("@solana/wallet-adapter-react-ui/styles.css");

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // @ts-ignore
  const [store, setStore] = useState<IStore>({});

  //@ts-ignore
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
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
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <ToastContainer limit={3} />

              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/readblog/:id" element={<ReadBlog />} />
                <Route
                  path="/connect-wallet/*"
                  element={<ConnectWallet />}
                />
                <Route path="/create-nft" element={<CreateNftSelector />} />
                <Route
                  path="/create-nft/single-item"
                  element={<CreateNftSingle />}
                />
                <Route path="/stats/ranking" element={<Ranking />} />
                <Route path="/stats/activity" element={<Activity />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/store" element={<StoreHomepage />} />
                <Route path="/store/settings" element={<StoreSettings />} />
                {/* <Route
                  path="/nft/:chain/:contractAddress/:id"
                  element={<NFTById general={store.general}/>}
                /> */}
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/create-store" element={<CreateStore />} />
                <Route path="/all-nfts" element={<AllNFTs />} />
                <Route path="/nft/:id" element={<ViewNft />} />
                <Route path="/auctions" element={<Auctions />} />
                <Route path="/profile/*" element={<Profile />} />
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
