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

//apis
import {getMarketplaceNfts} from "../../services/api/supplier"
import { metadata } from "0xsequence/dist/declarations/src/sequence";
import { useSelector } from "react-redux";
const Explore = () => {
  // HardCoded
  const [skiploading, setskiploading] = useState(true)
  const { networkID } = useSelector((state: any) => state.profile);
      const [metadata, setmetadata] = useState<any>([]);

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
  const [displayElements, setDisplayItems] = useState([]);
  const [sortBy, setsortBy] = useState<any>([['createdAt',-1]])
  const [sortBy2, setsortBy2] = useState<any>('createdAt')
  const [skip, setskip] = useState(0)

  async function fetchItems() {
    if (skiploading) {
      getMarketplaceNfts(skip, networkID, sortBy)
            .then((res: any) => {
              console.log("auc",res.data.totalAuctions);
              
                setDisplayItems(res.data.data)
               console.log(res.data.data);
               
                
            })
            .catch((error) => {
                console.log(error)
                setskiploading(false)
            })
    }
  }
  // Effect
  useEffect(() => {
    // nothing for now
    fetchItems()
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
      {displayElements.length>0 && <ExploreElements elements={displayElements} />}
    </section>
  );
};

export default Explore;
