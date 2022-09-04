// Images
import uuid from "react-uuid";
import image from "../../../assets/images/allNFTImage.png";
import likes from "../../../assets/svgs/likes.svg";

// Components
export const AllNFTsElement = ({ element }) => {
  return (
    <div className="all-nfts-element">
      <img className="element-image" src={image} alt={element} />
      <div className="info">
        <div>
          <div>{element}</div>
          <div>Price</div>
        </div>
        <div>
          <div>{element} #123</div>
          <div>0.05 ETH </div>
        </div>
      </div>
      <div className="buy">
        <button className="buy-link">
          BUY NOW
        </button>
        <div className="likes">
          <img src={likes} alt="Likes" />
          37
        </div>
      </div>
    </div>
  );
};

const AllNFTsElements = ({ list, arrangement, updateLoaded, ifShowButton }) => {
  // Grid Format decided by arrangement
  const style = {
    display: "grid",
    gridColumnGap: arrangement === 2 ? "10%" : "5%",
    gridRowGap: "30px",
    gridTemplateColumns: `repeat(${arrangement}, 1fr)`,
  };
  const btnStyle = !ifShowButton
    ? {
      display: "none",
    }
    : {};
  return (
    <div className="all-nfts-elements">
      <div className="elements" style={style}>
        {list.map((element:any, index:any) => (
          <AllNFTsElement element={element} key={uuid()} />
        ))}
      </div>
      <button
        onClick={() => updateLoaded()}
        style={btnStyle}
        className="load-more-button"
      >
        Load More
      </button>
    </div>
  );
};

export default AllNFTsElements;
