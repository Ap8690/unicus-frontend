// Custom Hook
import useExplorer from "../useExplorer";

const Element = ({ element }) => {
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
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-trending-elements" ref={holderRef}>
      {list.map((element, i) => (
        <Element element={element} key={`mpte${i}`} />
      ))}
    </div>
  );
};

export default MarketPlaceTrendingElements;
