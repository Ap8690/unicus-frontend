// Libs
import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy Image
import discoverImage from "../../../assets/images/Rectangle 8 (2).png";

const ListElement = ({ element }) => {
  // dummy link for now
  return <Link to={"/all-nft"}>{element}</Link>;
};
const MarketPlaceDiscover = ({ categories }) => {
  const [currentImage, setCurrentImage] = useState(discoverImage);
  return (
    <div className="market-place-discover">
      <h2 className="heading">Discover by category</h2>
      <div className="holder">
        <div className="left-list">
          {categories.slice(0, 4).map((element, i) => (
            <ListElement element={element} key={`lle${i}`} />
          ))}
        </div>
        <img
          src={currentImage}
          alt="Discover by category"
          className="discover-image"
        />
        <div className="right-list">
          {categories.slice(4, 8).map((element, i) => (
            <ListElement element={element} key={`lle${i + 4}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceDiscover;
