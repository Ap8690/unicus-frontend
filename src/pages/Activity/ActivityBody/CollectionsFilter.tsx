// Libraries
import { useState } from "react";

// Images
import chevronDown from "../../../assets/svgs/chevronDown.svg";

const CollectionsFilter = ({ collections }) => {
  const [collectionFilter, setCollectionFilter] = useState("");
  const [ifOpen, setIfOpen] = useState(false);
  return (
    <div className="collections-filter">
      <h3 className="collections-filter-heading">
        Collections{" "}
        <button onClick={() => setIfOpen(!ifOpen)}>
          <img src={chevronDown} alt="Expand List" />
        </button>
      </h3>
      <div className="collections-filter-search">
        <input
          type="text"
          onChange={(e) => setCollectionFilter(e.target.value)}
          value={collectionFilter}
        />
      </div>
    </div>
  );
};

export default CollectionsFilter;
