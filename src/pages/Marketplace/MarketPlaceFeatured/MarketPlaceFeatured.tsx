// Libs
import { useEffect, useState } from "react";

// Components
import MarketPlaceNavigator from "./MarketPlaceNavigatorFeatured";
import MarketPlaceNavigatorPanFeatured from "./MarketPlaceNavigatorPanFeatured"
import {getFeaturedNft} from "../../../services/api/supplier"

const MarketPlaceFeatured = ({ chain, title }) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [featuredNft,setFeturedNft] = useState([]);
  const length = featuredNft?.length > 0 ? Math.ceil(featuredNft?.length / 3) : 0;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedNft(10,chain)
    .then((res) => {
      //console.log(res)
      setFeturedNft(res?.data.nfts);
      setLoading(false)
    })
    .catch((err) => {
      //console.log(err);
      setLoading(false)
    });
  },[])


  useEffect(() => {
    setLoading(true)
    getFeaturedNft(10,chain)
    .then((res) => {
      setFeturedNft(res?.data.nfts);
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
    });
  },[chain])
  return (
    <div className="market-place-featured">
      <MarketPlaceNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        length={length}
        heading={title}
      />
      <MarketPlaceNavigatorPanFeatured loading={loading} list={featuredNft} currentScroll={currentScroll} />
    </div>
  );
};

export default MarketPlaceFeatured;
