// Custom Hook
import useExplorer from "../useExplorer";

const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <div className="nft-image-size">
      <img src={element.cloudinaryUrl} alt={element.heading} />
    </div>
    <h3 className="heading">{element.heading?.length > 15 ? element.heading?.slice(0,15) : element.heading}</h3>
    <p className="text text-center">{element.name}</p>
  </div> 
);
const MarketPlaceNavigatorPanFeatured = ({ list, currentScroll }) => {
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-featured-elements" ref={holderRef}>
      {list.map((element: object, i:number) => (
        <Element key={`mpfe${i}`} element={element} />
      ))}
    </div>
  );
};
export default MarketPlaceNavigatorPanFeatured;
