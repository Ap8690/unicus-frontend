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
import StayInLoop from "../../components/StayInLoop/StayInLoop";

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
      creatorName: "Pablo",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Coins",
      creatorImage: userImg,
      creatorName: "Monty",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Game",
      creatorImage: userImg,
      creatorName: "Python",
    },
    {
      image: featuredImg,
      heading: "Lorem Heading",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, quis mi elit magna blandit ac.",
      category: "Art",
      creatorImage: userImg,
      creatorName: "Sorachi",
    },
  ];

  const auctionsList = [
    {
      image: featuredImg,
      name: "Lorem ipsum dolor sit",
      sellerName: "Crybaby",
      ifVerified: true,
      type: "Live",
      date: new Date(2022, 6, 6).getTime(),
    },
    {
      image: featuredImg,
      name: "Lorem ipsum dolor sit",
      sellerName: "Crybaby",
      ifVerified: false,
      type: "Upcoming",
      days: 1,
      hours: 14,
      date: new Date(2022, 6, 10).getTime(),
    },
    {
      image: featuredImg,
      name: "Lorem ipsum dolor sit",
      sellerName: "Crybaby",
      ifVerified: true,
      type: "Ended",
      date: new Date(2022, 5, 27).getTime(),
    },
  ];

  const topCollectionsList = [
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
    {
      image: featuredImg,
      name: "Lorem Dollar",
      price: "14777,24",
      change: 321.62,
    },
  ];
  return (
    <section className="market-place">
      <BlueBackground />
      <MarketPlaceMain saleStats={saleStats} />
      <MarketPlaceFeatured list={featuredList} />
      <MarketPlaceTrending list={trendingList} />
      <MarketPlaceAuctions list={auctionsList} />
      <MarketPlaceTopCollections list={topCollectionsList} />
      <MarketPlaceCreateAndSell />
      <StayInLoop />
    </section>
  );
};

export default MarketPlace;
