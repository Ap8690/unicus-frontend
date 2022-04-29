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
import { STOREFRONT_URL } from './Utilities/Util'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Redirected = () => {
    return <Redirect to="/" />
}

function App() {
  const { accessToken, userInfo } = useSelector((state: any) => state.profile);
  const [store, setStore] = useState({})
  const getStore = async () => {
    try {
      const axiosConfig: any = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      
      if(accessToken) {
        const res = await axios.get(`${STOREFRONT_URL}/store/getStoreByUser`, axiosConfig);
        if(res.data.store){
        setStore(res.data.store)
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
      <div className="app">
        <Router>
          <Header store={store} />
          <ToastContainer limit={3} />
          <Switch>
            <Route path="/" exact={true} component={Explore} />
            <Route path="/create-multiple-nft" component={CreateMultipleNft} />
            <Route path="/login/:token/:email" component={Explore} />
            <Route path="/collections" component={Collections} />
            <Route path="/login/:token/:email/:store" component={Explore} />
            <Route path="/reset-password/:token/:email" component={Explore} />
            <Route
              path="/create-store"
              render={() => {
                return <CreateStore {...store} />;
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
    );
}
export default App
