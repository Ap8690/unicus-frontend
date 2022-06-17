// Lib
import { useState } from "react";

// Images
import elementImage from "../../assets/images/createselector1.png";
import creatorImage from "../../assets/images/token.png";

// Components
import BlueBackground from "../../components/BlueBackground/BlueBackground";
import AuctionsFilters from "./AuctionsFilters";
import AuctionsElements from "./AuctionsElements";

// Styles
import "./Auctions.scss";

const Auctions = () => {
  // HardCoded
  const filters = ["All", "Art", "Photos", "Games", "Music"];
  const elements = [
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
    {
      name: "Lorem Collection",
      image: elementImage,
      stock: 3,
      price: "0.44",
      creatorImage: creatorImage,
    },
  ];

  // States
  const [currentFilter, setCurrentFilter] = useState("All");
  const [displayElements, setDisplayItems] = useState(elements);

  return (
    <section className="auctions">
      <BlueBackground />
      <h1 className="auctions-heading">Auctions</h1>
      <AuctionsFilters
        filters={filters}
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
      />

      <AuctionsElements elements={displayElements} />
    </section>
  );
};

export default Auctions;
