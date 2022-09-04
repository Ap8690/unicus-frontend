// Libs
import { useEffect, useState } from "react";

// Components
import MarketPlaceAuctionsElements from "./MarketPlaceAuctionsElements"
import MarketPlaceAuctionsNavigator from "./MarketPlaceAuctionsNavigator"
import BottomNavigationMarker from "../BottomNavigationMarker"
import {getAuctions} from "../../../services/api/supplier"

const MarketPlaceAuctions = ({ chain }) => {
  // Take list and filter as per the requirement
  const [currentType, setCurrentType] = useState("live");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayList, setDisplayList] = useState('');
  const [loading, setLoading] = useState(true)

  // Some hardcoded data
  const types = ["Live", "Ended"]; //"Live", "Upcoming", "Ended"
  const length = width > 768 ? Math.ceil(displayList.length / 3) : displayList.length;

  // Filter out list on the basis of elements
  useEffect(() => {
    getAuctions(10,currentType,chain)
    .then(res => {
      console.log(res);
      setDisplayList(res?.data.nfts)
      setLoading(false)
    })
    .catch(err=>{
      setLoading(false)
    })
  }, [currentType,chain]);

  useEffect(() => {
    getAuctions(10,currentType,chain)
  },[])
  return (
    <div className="market-place-auctions">
      <MarketPlaceAuctionsNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        types={types}
        length={length}
        currentType={currentType}
        setCurrentType={setCurrentType}
      />
      {displayList && <MarketPlaceAuctionsElements loading={loading} list={displayList} currentScroll={currentScroll} currentType={currentType} />}
      {/* <BottomNavigationMarker currentPage={currentScroll} length={length} /> */}
    </div>
  );
};

export default MarketPlaceAuctions;
