// Library
import { useState } from "react";

// Images
import arrowLeft from "../../../assets/svgs/arrowLeft.svg";
import arrowRight from "../../../assets/svgs/arrowRight.svg";
import chevronDownBlue from "../../../assets/svgs/chevronDownBlue.svg";

// Helper function
const getNameForHeading = (category) => {
  if (category.toLowerCase() === "all") {
    return "all categories";
  } else {
    return category;
  }
};
// Element for Category list
const Category = ({ category, currentCategory, onClick }) => {
  if (category === currentCategory) return null;
  // don't render if same
  return (
    <button className="category-list-option" onClick={() => onClick(category)}>
      {getNameForHeading(category)}
    </button>
  );
};

// Exportable Navigator Component
const MarketPlaceTrendingNavigator = ({
  category,
  setCategory,
  categories,
  currentScroll,
  setCurrentScroll,
  length,
}) => {
  // States
  const [ifOpen, setIfOpen] = useState(false);
  const goLeft = () => {
    if (currentScroll == 0) {
      return;
      // do nothing
    }
    setCurrentScroll(currentScroll - 1);
  };

  const goRight = () => {
    if (currentScroll >= length - 1) {
      return;
    }
    setCurrentScroll(currentScroll + 1);
  };

  const updateCategory = (ct) => {
    setCategory(ct);
    setIfOpen(false);
    setCurrentScroll(0);
  };
  return (
    <div className="market-place-trending-navigator">
      <div className="header">
        <h2 className="heading">
          Trending in{" "}
          <div className="category-selector">
            <div
              className="category-list"
              style={
                !ifOpen
                  ? {
                      transform: "translateY(-20%) scale(0)",
                      transformOrigin: "top center",
                      opacity: 0,
                    }
                  : {
                      transform: "translateY(0)",
                      transformOrigin: "top center",
                      opacity: 1,
                    }
              }
            >
              {categories.map((ct, i) => (
                <Category
                  category={ct}
                  currentCategory={category}
                  onClick={updateCategory}
                  key={ct}
                />
              ))}
            </div>
          </div>
          <button onClick={() => setIfOpen(!ifOpen)}>
            {getNameForHeading(category)}
            <img
              src={chevronDownBlue}
              alt="Open Menu"
              style={
                ifOpen
                  ? {
                      transform: "rotateZ(180deg)",
                    }
                  : null
              }
            />
          </button>
        </h2>
        <div className="btn-holder">
          <button className="left-btn" onClick={goLeft}>
            <img src={arrowLeft} alt="Left Arrow" />
          </button>
          <button className="right-btn" onClick={goRight}>
            <img src={arrowRight} alt="Right Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceTrendingNavigator;
