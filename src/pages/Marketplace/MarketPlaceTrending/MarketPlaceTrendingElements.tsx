// Custom Hook
import useExplorer from "../useExplorer";
import userImg from "../../../assets/images/Rectangle 8 (1).png";
const Element = ({ element }) => {
  return (
    <div className="market-place-trending-element">
      <div className="nft-image-size">
        <img src={element.cloudinaryUrl} alt={element.name} />
      </div>
      <div className="info">
        <img
          src={userImg}
          alt={element.name}
          className="creator-image"
        />
        <div className="info-text">
          <h3 className="heading">{element?.name.length > 15 ? element?.name.slice(0,15) + "..." : element?.name}</h3>
          <p className="credit">
            By <span className="creator-name">{element?.owner.slice(0,9)}...</span>
          </p>
        </div>
      </div>
      <div className="text text-center">{element?.description.length > 36 ? element?.description.slice(0,35) : element?.description}...</div>
    </div>
  );
};
const MarketPlaceTrendingElements = ({ list, currentScroll }) => {
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-trending-elements" ref={holderRef}>
      {list.map((element:any, i:number) => (
        <Element element={element} key={`mpte${i}`} />
      ))}
    </div>
  );
};

export default MarketPlaceTrendingElements;
