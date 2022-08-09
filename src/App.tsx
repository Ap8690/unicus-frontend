// Libraries
import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

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
import Cookies from "js-cookie";
import { getStoreApi, getStoreByUser } from "./services/api/supplier";
import { ACCESS_TOKEN } from "./utils/constants";
import { isMainStore } from "./utils/utils";
// import NFTById from "./components/NFTById/NFTById";

require("@solana/wallet-adapter-react-ui/styles.css");

const App = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//@ts-ignore
const [store, setStore] = useState<IStore>({});
const [userStore, setUserStore] = useState({});
const [accessToken, setAccessToken] = useState("");
const [showStore, setShowStore] = useState(true);
const [loading, setLoading] = useState(false);
const navigate = useNavigate()
const location = useLocation()
useEffect(() => {
  if (isMainStore()) {
    getStoreForUser();
  } else {
    init();
    setLogin();
  }

  // document.documentElement.setAttribute("data-theme", "green");
}, [accessToken]);

useEffect(() => {
  if (store && store.appearance && store.appearance.storeLoader) {
    localStorage.setItem("storeLoader", store.appearance.storeLoader);
  }
}, [store]);

const init = async () => {
  try {
  
    setLoading(true);
    const res = await getStoreApi();
    setStore(res.data.store);
    setShowStore(true);
    localStorage.setItem("store", JSON.stringify(res.data.store));
  } catch (err: any) {
    // window.open("http://store-front.unicus.one/create-store", "_self");
    setShowStore(false);
  }
  setLoading(false);
};
const setLogin = () => {
  const cookieUser = Cookies.get("userInfo");

  let userInfo;
  if (cookieUser) {
    userInfo = JSON.parse(cookieUser);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  else{
    localStorage.removeItem("userInfo")
  }
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    setAccessToken(token)
  }
};
const getStoreForUser = async () => {
  try {
    console.log("main store access", Cookies.get(ACCESS_TOKEN));
    
    if (Cookies.get(ACCESS_TOKEN)) {
      const res = await getStoreByUser();
      if (res.data.store) {
        setUserStore(res.data.store);
      }
    } else {
      setUserStore({});
    }
  } catch (err) {
    console.log("err", err);
  }
};
useEffect(() => {
  if (location.pathname == "/") {
    navigate("/home", {replace:true});
  }
}, []);

// useEffect(() => {
//   getStoreForUser();
// }, [accessToken]);


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
            <Navbar store={isMainStore() ? userStore : store} />
            <ToastContainer limit={3} />

            <ScrollToTop />
            <Routes>
              {isMainStore() ? (
                <Route path="/home" element={<Homepage />} />
              ) : (
                <Route path="/home" element={<StoreHomepage />} />
              )}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/readblog/:id" element={<ReadBlog />} />
              <Route path="/connect-wallet/*" element={<ConnectWallet />} />
              <Route path="/create-nft" element={<CreateNftSingle />} />
              <Route
                path="/create-nft/single-item"
                element={<CreateNftSingle />}
              />
              {/* <Route path="/stats/ranking" element={<Ranking />} />
              <Route path="/stats/activity" element={<Activity />} /> */}
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:chain" element={<Explore />} />
              <Route path="/login/:token/:email" element={<Explore />} />{" "}
              <Route
                path="/reset-password/:token/:email"
                element={<Explore />}
              />
              {!isMainStore() && (
                <Route path="/store/settings" element={<StoreSettings />} />
              )}
              <Route path="/marketplace" element={<MarketPlace />} />
              {isMainStore() && <Route path="/create-store" element={<CreateStore />} />}
              <Route path="/all-nfts" element={<AllNFTs />} />
              <Route
                path="/nft/:chain/:contractAddress/:nftId"
                element={<ViewNft />}
              />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/profile/*" element={<Profile />} />
              {/* <Route
                  path="/edit-profile"
                  element={<EditProfile />}
                /> */}
            </Routes>
            <Footer />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
