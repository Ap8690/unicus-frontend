// Libs
import { Link } from "react-router-dom";
import uuid from 'react-uuid'
// Images
import mpWallet from "../../../assets/svgs/mpWallet.svg";
import mpCreate from "../../../assets/svgs/mpCreate.svg";
import mpAdd from "../../../assets/svgs/mpAdd.svg";
import mpList from "../../../assets/svgs/mpList.svg";

const Element = ({ element }) => {
  return (
    <div className="info-div">
      <div className="img-holder">
        <img src={element.image} alt={element.name} />
      </div>
      <h3 className="info-heading">{element.heading}</h3>
      <p className="info-text">{element.text}</p>
    </div>
  );
};
const MarketPlaceCreateAndSell = () => {
  const elements = [
    {
      name: "Wallet",
      image: mpWallet,
      heading: "Set up your wallet",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "Create",
      image: mpCreate,
      heading: "Create your collection",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "Add",
      image: mpAdd,
      heading: "Add your NFTs",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
    {
      name: "List",
      image: mpList,
      heading: "List them for sale",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor ornare ut lobortis sit erat morbi.",
    },
  ];
  return (
    <div className="market-place-create-and-sell">
      <div className="left">
        <h2 className="heading">Create And Sell your NFTs</h2>
        <Link to="/create-nft" className="btn nav-link">Create</Link>
      </div>
      <div className="right">
        {elements.map((element:any) => (
          <Element key={uuid()} element={element} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlaceCreateAndSell;
