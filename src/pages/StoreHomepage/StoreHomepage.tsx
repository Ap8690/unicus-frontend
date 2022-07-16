import featuredImg from "../../assets/images/Rectangle 8 (2).png";
import userImg from "../../assets/images/Rectangle 8 (1).png";

import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "../Marketplace/MarketPlaceMain";
import MarketPlaceDiscover from "../Marketplace/MarketPlaceDiscover/MarketPlaceDiscover";
import StayInLoop from "../../components/StayInLoop/StayInLoop";
import StoreSwiper from "./StoreSwiper/StoreSwiper";

const StoreHomepage = () => {
    const saleStats = {
        artworks: "37k",
        artists: "27k",
        auctions: "99k",
    };
    const recentlyCreatedList = [
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Art",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Coins",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Game",
        },
        {
            image: featuredImg,
            heading: "Lorem Heading",
            text: "Lorem Text",
            category: "Art",
        },
    ];
    const categories = [
        "Art",
        "Music",
        "Sport",
        "Virtual Worlds",
        "Utility",
        "Trading Cards",
        "Domain Names",
        "Collectibles",
      ];

    return (
        <section className="market-place">
            <BlueBackground />
            <MarketPlaceMain saleStats={saleStats} noStats storeTitle={'Create, Collect & Sell extraordinary NFTs'} noBanner />
            <StoreSwiper list={recentlyCreatedList} title={'Recently created'} />
            <StoreSwiper list={recentlyCreatedList} title={'Recently purchased'} />
            <StoreSwiper list={recentlyCreatedList} title={'Availbale for sale'} />
            <MarketPlaceDiscover categories={categories} />
            <StayInLoop />
        </section>
    );
};

export default StoreHomepage;