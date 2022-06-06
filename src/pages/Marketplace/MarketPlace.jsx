// Sass
import "./MarketPlace.scss";

// Images
import featuredImg from "../../assets/images/Rectangle 8 (2).png";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import MarketPlaceMain from "./MarketPlaceMain";
import MarketPlaceFeatured from "./MarketPlaceFeatured/MarketPlaceFeatured";

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
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem Text",
    },
  ];
  return (
    <section className="market-place">
      <BlueBackground />
      <MarketPlaceMain saleStats={saleStats} />
      <MarketPlaceFeatured list={featuredList} />
    </section>
  );
};

export default MarketPlace;
