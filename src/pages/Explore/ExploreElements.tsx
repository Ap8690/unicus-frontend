import { Link } from "react-router-dom";
import { getChainSymbol, getNftContractAddress } from "../../utils/utils";

const ExploreElement = ({ element }) => {
  return (
    <Link
      to={{
        pathname: `/nft/${element.chain}/${getNftContractAddress(
          element.nftId
        )}/${element.tokenId}`,
      }}
    >
      <div className="explore-element">
        <div className="explore-element-item-image">
          <img src={element.cloudinaryUrl} alt={element.name} />
        </div>

        <div className="explore-element-name">{element.name}</div>
        <div className="explore-element-price">
          {element && element.lastBid
            ? (element.lastBid / Math.pow(10, 18)).toFixed(4)
            : (element.startBid / Math.pow(10, 18)).toFixed(4)}{" "}
          {getChainSymbol(element.chain)}
        </div>
        <div className="explore-element-creators">
          {/* <img
          src={element.creatorImage}
          alt="A creator of given collection"
          className="explore-element-creator-image"
        /> */}
        </div>
        {/* <div className="explore-element-stock">{element.stock} in stock</div> */}
      </div>
    </Link>
  );
};

const ExploreElements = ({ elements }) => {
  return (
    <div className="explore-elements">
      {elements.map((element) => (
        <ExploreElement element={element} />
      ))}
    </div>
  );
};

export default ExploreElements;
