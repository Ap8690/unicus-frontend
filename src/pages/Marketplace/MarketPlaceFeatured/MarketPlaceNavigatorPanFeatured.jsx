// Custom Hook
import useExplorer from "../useExplorer";

const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <img src={element.image} alt={element.title} />
    <h3 className="heading">{element.heading}</h3>
    <p className="text">{element.text}</p>
  </div>
);
const MarketPlaceNavigatorPanFeatured = ({ list, currentScroll }) => {
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-featured-elements" ref={holderRef}>
      {list.map((element, i) => (
        <Element key={`mpfe${i}`} element={element} />
      ))}
    </div>
  );
};
export default MarketPlaceNavigatorPanFeatured;
