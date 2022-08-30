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

  useEffect(() => {
    getFeaturedNft(10,chain)
    .then((res) => {
      console.log(res)
      setFeturedNft(res?.data.nfts);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])


  useEffect(() => {
    getFeaturedNft(10,chain)
    .then((res) => {
      console.log(res)
      setFeturedNft(res?.data.nfts);
    })
    .catch((err) => {
      console.log(err);
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
      <MarketPlaceNavigatorPanFeatured list={featuredNft} currentScroll={currentScroll} />
    </div>
  );
};

export default MarketPlaceFeatured;
