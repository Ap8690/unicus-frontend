// Images
import { Link } from "react-router-dom";
import ethereum from "../../../assets/svgs/ethereum.svg";
import uuid from 'react-uuid'

const Element = ({ element }) => {
  const sign = element.change >= 0 ? "+" : "-";
  return (
    <div className="market-place-top-collections-element">
      <div className="indivisual-container">
        <img src={element.image} alt={element.name} />
        <div className="name">{element.name}</div>
      </div>
      <div className="indivisual-container">
        <div className="price">
          <img src={ethereum} alt="ethereum" />
          {element.price}
        </div>
        <div className="change">
          <span>
            {sign}
          </span>
           {element.change}%
        </div>
      </div>
    </div>
  );
};

const MarketPlaceTopCollectionsElements = ({ list }) => {
  // 8 elements list
  return (
    <>
      <div className="market-place-top-collections-elements">
        {list.map((element, i) => (
          <Element element={element} key={uuid()} />
          ))}
      </div>
      <div className="goto-ranking hid">
        <Link to={"/stats/ranking"} className="goto-ranking btn nav-link">
            Go To Ranking
        </Link>
      </div>
    </>
  );
};

export default MarketPlaceTopCollectionsElements;
