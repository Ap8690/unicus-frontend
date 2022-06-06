import { useEffect, useRef } from "react";

const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <img src={element.image} alt={element.title} />
    <h3 className="heading">{element.heading}</h3>
    <p className="text">{element.text}</p>
  </div>
);
const MarketPlaceNavigatorPanFeatured = ({ list, currentScroll }) => {
  const holderRef = useRef(null);
  useEffect(() => {
    if (holderRef.current) {
      holderRef.current.scrollLeft =
        currentScroll * (holderRef.current.offsetWidth * 1.05);
    }
  }, [holderRef, currentScroll]);
  return (
    <div className="market-place-featured-elements" ref={holderRef}>
      {list.map((element, i) => (
        <Element key={`mpfe${i}`} element={element} />
      ))}
    </div>
  );
};
export default MarketPlaceNavigatorPanFeatured;
