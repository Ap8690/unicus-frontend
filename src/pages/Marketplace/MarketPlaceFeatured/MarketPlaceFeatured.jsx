// Libs
import { useState } from "react";

// Components
import MarketPlaceNavigator from "./MarketPlaceNavigatorFeatured";
import MarketPlaceNavigatorPanFeatured from "./MarketPlaceNavigatorPanFeatured";

const MarketPlaceFeatured = ({ list }) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const length = Math.ceil(list.length / 3);
  return (
    <div className="market-place-featured">
      <MarketPlaceNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        length={length}
        heading={"Featured Artworks"}
      />
      <MarketPlaceNavigatorPanFeatured list={list} currentScroll={currentScroll} />
    </div>
  );
};

export default MarketPlaceFeatured;
