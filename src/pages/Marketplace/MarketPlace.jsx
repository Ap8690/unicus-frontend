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

  const trendingList = [
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Art",
      creatorImage: userImg,
      creatorName: "Pablo"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Coins",
      creatorImage: userImg,
      creatorName: "Monty"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Game",
      creatorImage: userImg,
      creatorName: "Python"
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Art",
      creatorImage: userImg,
      creatorName: "Sorachi"
    },
  ];
  return (
    <section className="market-place">
      <BlueBackground />
      <MarketPlaceMain saleStats={saleStats} />
      <MarketPlaceFeatured list={featuredList} />
      <MarketPlaceTrending list={trendingList} />
    </section>
  );
};

export default MarketPlace;
