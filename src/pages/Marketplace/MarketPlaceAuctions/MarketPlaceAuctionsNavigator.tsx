// Images
import arrowLeft from "../../../assets/svgs/arrowLeft.svg";
import arrowRight from "../../../assets/svgs/arrowRight.svg";

const TypeButton = ({ type, currentType, updateType }) => {
  let className = "type-button";
  const onClick = () => updateType(type);
  if (type.toLowerCase() === currentType) {
    className += " current";
  }
  return (
    <button className={className} onClick={onClick}>
      {type}
    </button>
  );
};

const MarketPlaceAuctionsNavigator = ({
  types,
  currentType,
  setCurrentType,
  currentScroll,
  setCurrentScroll,
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

  // Always convert to lowercase
  const updateType = (tp) => setCurrentType(tp.toLowerCase());
  return (
    <div className="market-place-auctions-navigator">
      <div className="header">
        <div className="heading">Auctions</div>
        <div className="types">
          {types.map((type, i) => (
            <TypeButton
              type={type}
              currentType={currentType}
              key={`tpb${i}`}
              updateType={updateType}
            />
          ))}
        </div>
        <div className="btn-holder">
          <button className="left-btn" id="auction-nav-left" onClick={goLeft}>
            <img src={arrowLeft} alt="Left Arrow" />
          </button>
          <button className="right-btn" id="auction-nav-right" onClick={goRight}>
            <img src={arrowRight} alt="Right Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceAuctionsNavigator;
