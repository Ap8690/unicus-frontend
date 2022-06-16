// Images
import image from "../../../assets/images/allNFTImage.png";
import likes from "../../../assets/svgs/likes.svg";

// Components
const AllNFTsElement = ({ element }) => {
  return (
    <div className="all-nfts-element">
      <img className="element-image" src={image} alt={element} />
      <div className="info">
        <div>{element}</div>
        <div>Price</div>
        <div>{element} #123</div>
        <div>0.05 ETH </div>
      </div>
      <div className="buy">
        <a href="#" className="buy-link">
          Buy Now
        </a>
        <div className="likes">
          <img src={likes} alt="Likes" />
          37
        </div>
      </div>
    </div>
  );
};

const AllNFTsElements = ({ list, arrangement }) => {
  // Grid Format decided by arrangement
  const style = {
    display: "grid",
    gridColumnGap: arrangement === 2 ? "10%" : "5%",
    gridRowGap: "30px",
    gridTemplateColumns: `repeat(${arrangement}, 1fr)`,
  };
  return (
    <div className="all-nfts-elements" style={style}>
      {list.map((element, index) => (
        <AllNFTsElement element={element} key={`anfte${index}`} />
      ))}
    </div>
  );
};

export default AllNFTsElements;
