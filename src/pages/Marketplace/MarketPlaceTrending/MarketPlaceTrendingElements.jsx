// Lib
import { useRef, useEffect } from "react";

const MarketPlaceTrendingElement = ({ element }) => {
  return (
    <div className="market-place-trending-element">
      <img src={element.image} alt={element.heading} />
      <div className="info">
        <img
          src={element.creatorImage}
          alt={element.creatorName}
          className="creator-image"
        />
        <h3 className="heading">{element.heading}</h3>
        <p className="credit">
          By <span className="creator-name">{element.creatorName}</span>
        </p>
      </div>
      <div className="text">{element.text}</div>
    </div>
  );
};
const MarketPlaceTrendingElements = ({ list, currentScroll }) => {
  const holderRef = useRef(null);
  useEffect(() => {
    if (holderRef.current) {
      holderRef.current.scrollLeft =
        currentScroll * (holderRef.current.offsetWidth * 1.05);
    }
  }, [holderRef, currentScroll]);
  return (
    <div className="market-place-trending-elements" ref={holderRef}>
      {list.map((element, i) => (
        <MarketPlaceTrendingElement element={element} key={`mpte${i}`} />
      ))}
      
    </div>
  );
};

export default MarketPlaceTrendingElements;
