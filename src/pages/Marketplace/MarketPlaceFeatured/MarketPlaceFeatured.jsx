// Libs
import { useState } from "react";

// Components
import MarketPlaceNavigator from "./MarketPlaceNavigatorFeatured";
import MarketPlaceNavigatorPanFeatured from "./MarketPlaceNavigatorPanFeatured";

const MarketPlaceFeatured = ({ list }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const length = Math.ceil(list.length / 3);
  return (
    <div className="market-place-featured">
      <MarketPlaceNavigator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        length={length}
        heading={"Featured Artworks"}
      />
      <MarketPlaceNavigatorPanFeatured list={list} currentPage={currentPage} />
    </div>
  );
};

export default MarketPlaceFeatured;
