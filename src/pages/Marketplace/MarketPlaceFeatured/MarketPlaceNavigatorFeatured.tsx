// Images
import arrowLeft from "../../../assets/svgs/arrowLeft.svg";
import arrowRight from "../../../assets/svgs/arrowRight.svg";

// Exportable Navigator Component
const MarketPlaceNavigator = ({
  currentScroll,
  setCurrentScroll,
  heading,
  length,
}) => {
  const goLeft = () => {
    if (currentScroll === 0) {
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

  return (
    <div className="market-place-featured-navigator">
      <div className="header">
        <h2 className="heading">{heading}</h2>
        <div className="btn-holder">
          <button className="left-btn" id="featured-nav-left" onClick={goLeft}>
            <img src={arrowLeft} alt="Left Arrow" />
          </button>
          <button className="right-btn" id="featured-nav-right" onClick={goRight}>
            <img src={arrowRight} alt="Right Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceNavigator;
