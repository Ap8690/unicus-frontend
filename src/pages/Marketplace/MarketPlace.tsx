import {useContext} from "react"
import { ChainContext } from "../../context/ChainContext";
// Sass
import "./MarketPlace.scss";

// Images
import featuredImg from "../../assets/images/Rectangle 8 (2).png";
import userImg from "../../assets/images/Rectangle 8 (1).png";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "./MarketPlaceMain";
import MarketPlaceFeatured from "./MarketPlaceFeatured/MarketPlaceFeatured";
import MarketPlaceTrending from "./MarketPlaceTrending/MarketPlaceTrending";
import MarketPlaceAuctions from "./MarketPlaceAuctions/MarketPlaceAuctions";
import MarketPlaceTopCollections from "./MarketPlaceTopCollections/MarketPlaceTopCollections";
import MarketPlaceCreateAndSell from "./MarketPlaceCreateAndSell/MarketPlaceCreateAndSell";
import MarketPlaceDiscover from "./MarketPlaceDiscover/MarketPlaceDiscover";
import StayInLoop from "../../components/StayInLoop/StayInLoop";
import { Helmet } from "react-helmet";

const MarketPlace = () => {
  const {chain} = useContext(ChainContext)
  const saleStats = {
    artworks: "37k",
    artists: "27k",
    auctions: "99k",
  };
  // Categories
  const categories = ["Funny","Art","Nature","Animal","Sports","Photography","Music","Metaverse"];
  return (
    <section className="market-place">
      <Helmet>
                <meta charSet="utf-8" />
                <title>UnicusOne - Marketplace</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
      <BlueBackground />
      <MarketPlaceMain saleStats={saleStats} noStats={false} storeTitle={'Create, Sell & Collect Your Own Creative NFT'} />
      <MarketPlaceFeatured chain={chain} title={"Featured Artworks"} />
      <MarketPlaceTrending chain={chain}/>
      <MarketPlaceAuctions chain={chain} />
      {/* <MarketPlaceTopCollections list={topCollectionsList} /> */}
      <MarketPlaceCreateAndSell />
      <MarketPlaceDiscover chain={chain} categories={categories} />
      <StayInLoop />
    </section>
  );
};

export default MarketPlace;
