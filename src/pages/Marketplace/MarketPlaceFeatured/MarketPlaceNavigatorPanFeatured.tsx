// Custom Hook
import useExplorer from "../useExplorer";

const Element = ({ element }) => (
  <div className="market-place-featured-element">
    <div className="nft-image-size">
      <img src={element.cloudinaryUrl} alt={element.name} />
    </div>
    <h3 className="heading">{element.name?.length > 15 ? element.name?.slice(0,15) : element.name}</h3>
    <p className="text text-center">{element.description}</p>
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
