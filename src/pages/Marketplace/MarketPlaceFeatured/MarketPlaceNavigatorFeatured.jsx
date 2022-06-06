// Images
import arrowLeft from "../../../assets/svgs/arrowLeft.svg";
import arrowRight from "../../../assets/svgs/arrowRight.svg";

// Exportable Navigator Component
const MarketPlaceNavigator = ({
  currentPage,
  setCurrentPage,
  heading,
  length,
}) => {
  const goLeft = () => {
    if (currentPage == 0) {
      return;
      // do nothing
    }
    setCurrentPage(currentPage - 1);
  };

  const goRight = () => {
    if (currentPage >= length - 1) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="market-place-featured-navigator">
      <div className="header">
        <h2 className="heading">{heading}</h2>
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

export default MarketPlaceNavigator;
