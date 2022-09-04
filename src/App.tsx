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
import NotFound from "./components/404/NotFound";
import StoreHomepage from "./pages/StoreHomepage/StoreHomepage";
import StoreSettings from "./pages/StoreSettings/StoreSettings";
import Cookies from "js-cookie";
import { getStoreApi, getStoreByUser } from "./services/api/supplier";
import { ACCESS_TOKEN, defaultPrivacyText } from "./utils/constants";
import { isMainStore } from "./utils/utils";
import PrivacyPolicy from "./pages/UsefulLinks/PrivacyPolicy";
import EditProfile from "./pages/EditProfile/EditProfile";
import GlobalSearch from "./pages/GlobalSearch/GlobalSearch"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import NFTById from "./components/NFTById/NFTById";

require("@solana/wallet-adapter-react-ui/styles.css");

const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//@ts-ignore
const [store, setStore] = useState<IStore>({});
const [userStore, setUserStore] = useState<any>();
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
  console.log("cookieUser: ", cookieUser);

  let userInfo: any;
  if (cookieUser) {
    userInfo = JSON.parse(cookieUser);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log("Setting localstorage")
  }
  else{
    localStorage.removeItem("userInfo")
    console.log("UnSetting localstorage")
  }
  const token = Cookies.get(ACCESS_TOKEN);
  console.log("token: ", token);
  if (token) {
    setAccessToken(token)
  }
};
const getStoreForUser = async () => {
  try {
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
      new PhantomWalletAdapter({ network }),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletExtensionWalletAdapter({ network }),
      new SolletWalletAdapter({ network }),
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
              <Route path="/explore/:chainNetwork" element={<Explore />} />
              <Route path="/search/:search" element={<GlobalSearch/>} />
              <Route path="/login/:token/:email" element={<Explore />} />{" "}
              <Route
                path="/reset-password/:token/:email"
                element={<Explore />}
              />
              {isMainStore() && Object.keys(store).length > 0 && (
                <>
                  <Route path="/store/settings" element={<StoreSettings />} />
                  <Route
                    path="/privacy-policy"
                    element={
                      <PrivacyPolicy
                        title={"Privacy Policy"}
                        text={
                          store.advance.privacyPolicy &&
                          store.advance.privacyPolicy != ""
                            ? store.advance.privacyPolicy
                            : defaultPrivacyText
                        }
                      />
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <PrivacyPolicy
                        title={"Terms and Conditions"}
                        text={
                          store.advance.terms && store.advance.terms != ""
                            ? store.advance.terms
                            : defaultPrivacyText
                        }
                      />
                    }
                  />
                  <Route
                    path="/about-us"
                    element={
                      <PrivacyPolicy
                        title={"About Us"}
                        text={
                          store.advance.aboutUs && store.advance.aboutUs != ""
                            ? store.advance.aboutUs
                            : defaultPrivacyText
                        }
                      />
                    }
                  />
                  <Route
                    path="/creators"
                    element={
                      <PrivacyPolicy
                        title={"Creators"}
                        text={
                          store.advance.creators && store.advance.creators != ""
                            ? store.advance.creators
                            : defaultPrivacyText
                        }
                      />
                    }
                  />
                </>
              )}
              <Route path="/marketplace" element={<MarketPlace />} />
              {isMainStore() && (
                <Route path="/create-store" element={<CreateStore />} />
              )}
              <Route path="/all-nfts" element={<AllNFTs />} />
              <Route
                path="/nft/:chain/:contractAddress/:nftId"
                element={<ViewNft />}
              />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/edit-profile" element={<EditProfile isLogin={accessToken}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:profileState" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
