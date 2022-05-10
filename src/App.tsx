import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom'

// Pages
import NotFound from './Pages/NotFound/NotFound'
import CreateNft from './Pages/CreateNft'
import CreateMultipleNft from './Pages/CreateMultipleNFT'
import Contact from './Pages/Contact'
import Portfolio from './Pages/Portfolio'
import Explore from './Components/Explore/Explore'
import Collections from './Components/Collections/Collections'
import Auctions from './Pages/Auctions'
import NFTById from './Components/NFTById/NFTById'
import Artists from './Pages/Artists'
import UnicusToken from './Pages/UnicusToken'

// components
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import ArrowUp from './Components/ArrowUp/ArrowUp'
import ArtistWrapper from './Pages/ArtistWrapper'
import GlobalSearch from './Pages/GlobalSearch'
import MyStore from './Pages/MyStore/MyStore'
import CreateStore from './Components/StoreFront/CreateStore'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import { defaultPrivacyText, sslFix, UNICUS_STORE } from './Utilities/Util'
import { useDispatch, useSelector } from 'react-redux'
import { Suspense, useEffect, useState } from 'react'
import { backendUrl } from './config'
import { IStore } from './Models/Store'
import { getUserInfo } from './Redux/Profile/actions'
import ErrorBoundary from './Components/ErrorBoundary'
import StoreLoader from './Components/StoreLoader'
import HomePage from './Components/StoreFront/HomePageStore'
import PrivacyPolicy from './Pages/UsefulLinks/PrivacyPolicy'
import StoreFooter from './Components/StoreFront/StoreFooter'
import StoreHeader from './Components/StoreFront/StoreHeader/StoreHeader'

function App() {
  const { accessToken, userInfo } = useSelector((state: any) => state.profile);
  //@ts-ignore
  const [store, setStore] = useState<IStore>({});
  const [userStore, setUserStore]=useState({})
  const [showStore, setShowStore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(window.location.host === UNICUS_STORE){
      getStore()
    }else{
    init();
    setLogin();
    }
    console.log("base", process.env.REACT_APP_ENV, backendUrl);

    // document.documentElement.setAttribute("data-theme", "green");
  }, []);
  useEffect(() => {
    if (store && store.appearance && store.appearance.storeLoader) {
      localStorage.setItem("storeLoader", store.appearance.storeLoader);
    }
  }, [store]);

  const init = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/store`);
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
      dispatch(getUserInfo(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
    }
  };    
  const getStore = async () => {
    try {
      const axiosConfig: any = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      
      if(accessToken) {
        const res = await axios.get(`${backendUrl}/store/getStoreByUser`, axiosConfig);
        if(res.data.store){
        setUserStore(res.data.store)
        }
      }
    } catch (err) {
      console.log("err", err);
      
    }
  };

  useEffect(() => {

    getStore()
  },[accessToken])
  

    return (
      <div>
        {false ? (
          <div className="app">
            <Router>
              <Header store={userStore} />
              <ToastContainer limit={3} />
              <Switch>
                <Route path="/" exact={true} component={Explore} />
                <Route
                  path="/create-multiple-nft"
                  component={CreateMultipleNft}
                />
                <Route path="/login/:token/:email" component={Explore} />
                <Route path="/collections" component={Collections} />
                <Route path="/login/:token/:email/:store" component={Explore} />
                <Route
                  path="/reset-password/:token/:email"
                  component={Explore}
                />
                <Route
                  path="/create-store"
                  render={() => {
                    return <CreateStore {...userStore} />;
                  }}
                />
                <Route path="/auctions" component={Auctions} />
                <Route path="/create-nft" component={CreateNft} />
                <Route
                  path="/nft/:chain/:contractAddress/:id"
                  component={NFTById}
                />
                <Route
                  path="/sale/:chain/:contractAddress/:id"
                  component={NFTById}
                />
                <Route
                  path="/auction/:chain/:contractAddress/:id"
                  component={NFTById}
                />
                <Route path="/contact" component={Contact} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/artists" component={ArtistWrapper} />
                <Route path="/search/:search" component={GlobalSearch} />
                <Route path="/artist/:artist" component={Artists} />
                <Route path="/token" component={UnicusToken} />
                {/* <Route path='/my-store' component={MyStore}/> */}
                <Route path="*" component={NotFound} />
              </Switch>
              <ArrowUp />
              <Footer />
            </Router>
          </div>
        ) : (
          <div className="app">
            {store && store.general ? (
              <Helmet>
                <meta charSet="utf-8" />
                <meta
                  name="title"
                  content={store.general.storeName}
                  data-react-helmet="true"
                />
                <link
                  rel="icon"
                  href={sslFix(store.general.logoUrl)}
                  sizes="16x16"
                />

                <link
                  rel="shortcut icon"
                  href={sslFix(store.general.logoUrl)}
                  sizes="16x16"
                />
              </Helmet>
            ) : (
              ""
            )}
            <ErrorBoundary>
              <Suspense fallback={<StoreLoader />}>
                {!loading ? (
                  <Router>
                    <StoreHeader general={store.general} />
                    <ToastContainer limit={3} />
                    {showStore ? (
                      <Switch>
                        {store.general && store.general.marketPlaceAsHome ? (
                          <Route
                            path="/"
                            render={() => {
                              return <Explore />;
                            }}
                            exact={true}
                          />
                        ) : (
                          <Route
                            path="/"
                            render={() => {
                              return <HomePage {...store} />;
                            }}
                            exact={true}
                          />
                        )}
                        <Route
                          path="/auctions"
                          render={() => {
                            return <Auctions />;
                          }}
                        />
                        <Route
                          path="/explore"
                          render={() => {
                            return <Explore />;
                          }}
                        />
                        <Route
                          path="/nft/:chain/:contractAddress/:id"
                          render={() => {
                            return <NFTById />;
                          }}
                        />
                        <Route
                          path="/sale/:chain/:contractAddress/:id"
                          render={() => {
                            return <NFTById />;
                          }}
                        />
                        <Route
                          path="/auction/:chain/:contractAddress/:id"
                          render={() => {
                            return <NFTById />;
                          }}
                        />
                        <Route
                          path="/portfolio"
                          render={() => {
                            return <Portfolio />;
                          }}
                        />
                        {(store.general &&
                          store.general.user === userInfo._id) ||
                        true ? (
                          <Route path="/my-store" component={MyStore} />
                        ) : (
                          ""
                        )}
                        {/* <Route path="/my-account" component={MyStore} /> */}
                        {/* <Route path="/airdrop" component={MyStore} />
                <Route path="/gated-links" component={MyStore} />
                <Route path="/waiting-lists" component={MyStore} /> */}
                        <Route
                          path="/create-nft"
                          render={() => {
                            return <CreateNft />;
                          }}
                        />
                        <Route
                          path="/collections"
                          render={() => {
                            return <Collections />;
                          }}
                        />

                        <Route
                          path="/login/:token/:email"
                          render={() => {
                            return <Explore />;
                          }}
                        />
                        {/* <Route path="/artists" component={ArtistWrapper} /> */}
                        <Route
                          path="/search/:search"
                          component={GlobalSearch}
                        />
                        {/* <Route
                    path="/artist/:artist"
                    render={() => {
                      return <Artists {...store.general} />;
                    }}
                  /> */}
                        {store.advance ? (
                          <Route
                            path="/privacy-policy"
                            render={() => {
                              return (
                                <PrivacyPolicy
                                  title={"Privacy Policy"}
                                  text={
                                    store.advance.privacyPolicy &&
                                    store.advance.privacyPolicy != ""
                                      ? store.advance.privacyPolicy
                                      : defaultPrivacyText
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {store.advance ? (
                          <Route
                            path="/terms"
                            render={() => {
                              return (
                                <PrivacyPolicy
                                  title={"Terms and Conditions"}
                                  text={
                                    store.advance.privacyPolicy &&
                                    store.advance.privacyPolicy != ""
                                      ? store.advance.privacyPolicy
                                      : defaultPrivacyText
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {store.advance ? (
                          <Route
                            path="/about-us"
                            render={() => {
                              return (
                                <PrivacyPolicy
                                  title={"About Us"}
                                  text={
                                    store.advance.privacyPolicy &&
                                    store.advance.privacyPolicy != ""
                                      ? store.advance.privacyPolicy
                                      : defaultPrivacyText
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          ""
                        )}
                        {store.advance ? (
                          <Route
                            path="/creators"
                            render={() => {
                              return (
                                <PrivacyPolicy
                                  title={"Creators"}
                                  text={
                                    store.advance.privacyPolicy &&
                                    store.advance.privacyPolicy != ""
                                      ? store.advance.privacyPolicy
                                      : defaultPrivacyText
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <Route path="*" component={NotFound} />
                      </Switch>
                    ) : (
                      <NotFound />
                    )}
                    {store.appearance && store.appearance.showFooter ? (
                      <StoreFooter {...store.general} />
                    ) : (
                      ""
                    )}
                  </Router>
                ) : (
                  <StoreLoader />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
      </div>
    );
}
export default App
