// Lib
import { useEffect, useState } from "react";

// Images
import elementImage from "../../assets/images/createselector1.png";
import creatorImage from "../../assets/images/token.png";

// SASS
import "./Explore.scss";

// Components
import ExploreFilters from "./ExploreFilters";
import ExploreElements from "./ExploreElements";
import BlueBackground from "../../components/BlueBackground/BlueBackground";

const Explore = () => {
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

  // Effect
  useEffect(() => {
    // nothing for now
  }, [currentFilter]);

  return (
    <section className="explore">
      <BlueBackground />
      <h1 className="explore-heading">Explore Collections</h1>
      <ExploreFilters
        filters={filters}
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
      />
      <ExploreElements elements={displayElements} />
    </section>
  );
};

export default Explore;
