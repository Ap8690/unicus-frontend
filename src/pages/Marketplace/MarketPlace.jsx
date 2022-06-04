// Sass
import "./MarketPlace.scss";

// Components
import MarketPlaceMain from "./MarketPlaceMain";

const MarketPlace = () => {
  const saleStats = {
    artworks: "37k",
    artists: "27k",
    auctions: "99k",
  };
  return (
    <section className="market-place">
      <MarketPlaceMain saleStats={saleStats} />
    </section>
  );
};

export default MarketPlace;
