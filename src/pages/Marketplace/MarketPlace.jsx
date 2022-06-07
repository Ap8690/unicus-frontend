// Sass
import "./MarketPlace.scss";

// Images
import featuredImg from "../../assets/images/Rectangle 8 (2).png";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "./MarketPlaceMain";
import MarketPlaceFeatured from "./MarketPlaceFeatured/MarketPlaceFeatured";
import MarketPlaceTrending from "./MarketPlaceTrending/MarketPlaceTrending";

const MarketPlace = () => {
  const saleStats = {
    artworks: "37k",
    artists: "27k",
    auctions: "99k",
  };
  const featuredList = [
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
      category: "Art"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
      category: "Coins"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
      category: "Game"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
      category: "Art"
    },
  ];
  return (
    <section className="market-place">
      <BlueBackground />
      <MarketPlaceMain saleStats={saleStats} />
      <MarketPlaceFeatured list={featuredList} />
      <MarketPlaceTrending list={featuredList} />
    </section>
  );
};

export default MarketPlace;
