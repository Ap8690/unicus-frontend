import { useEffect, useState } from "react";

// Components
import MarketPlaceTrendingNavigator from "./MarketPlaceTrendingNavigator";
import MarketPlaceTrendingElements from "./MarketPlaceTrendingElements";
import BottomNavigationMarker from "../BottomNavigationMarker";
import {getTrendingNft} from "../../../services/api/supplier"

const MarketPlaceTrending = ({ chain }) => {
  // We can filter this list as per requirement
  const [category, setCategory] = useState("all");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [trendingNfts, setTrendingNfts]  = useState([]);
  const [loading, setLoading] = useState(true)

  // Hardcoded
  const length = trendingNfts?.length > 0 ? Math.ceil(trendingNfts?.length / 3) : 0;
  const categories = ["all", "art", "funny", "nature", "animal", "sports", "photography", "music","metaverse"];

  useEffect(() => {
    getTrendingNft(10,category,chain)
    .then((res) => {
      console.log(res)
      setTrendingNfts(res?.data.nfts);
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      console.log(err);
    });
    console.log(category);
  }, [category,chain]);



  return (
    <div className="market-place-trending">
      <MarketPlaceTrendingNavigator
        category={category}
        setCategory={setCategory}
        categories={categories}
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        length={length}
      />{trendingNfts.length>0?
      <MarketPlaceTrendingElements
        list={trendingNfts}
        currentScroll={currentScroll}
        loading={loading}
      />: <div style={{textAlign:"center", marginTop:"35px"}}>No Nfts Found</div>}
      {/* <BottomNavigationMarker currentPage={currentScroll} length={length} /> */}
    </div>
  );
};

export default MarketPlaceTrending;
