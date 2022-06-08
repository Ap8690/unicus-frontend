// Images
import ethereum from "../../../assets/svgs/ethereum.svg";

const Element = ({ element }) => {
  const sign = element.change >= 0 ? "+" : "-";
  return (
    <div className="market-place-top-collections-element">
      <img src={element.image} alt={element.name} />
      <div className="name">{element.name}</div>
      <div className="price">
        <img src={ethereum} alt="ethereum" />
        {element.price}
      </div>
      <div className="change">
        {sign} {element.change}
      </div>
    </div>
  );
};

const MarketPlaceTopCollectionsElements = ({ list }) => {
  // 8 elements list
  return (
    <div className="market-place-top-collections-elements">
      {list.map((element, i) => (
        <Element element={element} key={`mptce${i}`} />
      ))}
    </div>
  );
};

export default MarketPlaceTopCollectionsElements;
