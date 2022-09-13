// Libs
import { useEffect, useState } from "react";

// Components
import MarketPlaceNavigator from "../../Marketplace/MarketPlaceFeatured/MarketPlaceNavigatorFeatured";
import MarketPlaceNavigatorPanFeatured from "../../Marketplace/MarketPlaceFeatured/MarketPlaceNavigatorPanFeatured";

const StoreSwiper = ({ list, title, loading }) => {
    const [currentScroll, setCurrentScroll] = useState(0);
    // const [featuredNft, setFeturedNft] = useState([]);
    const length = list?.length > 0 ? Math.ceil(list?.length / 3) : 0;

    return (
        <div className="market-place-featured">
            <MarketPlaceNavigator
                currentScroll={currentScroll}
                setCurrentScroll={setCurrentScroll}
                length={length}
                heading={title}
            />
            {list && list.length > 0 ? (
                <MarketPlaceNavigatorPanFeatured
                    loading={loading}
                    list={list}
                    currentScroll={currentScroll}
                />
            ) : (
                <div className="min-h-[300px] text-xl font-bold flex justify-center items-center">
                    No Nfts Found
                </div>
            )}
        </div>
    );
};

export default StoreSwiper;
