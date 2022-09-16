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
      heading: "Connect with Unicus",
      text: "Download a Web3.0 Wallet like Metamask, Quickly create an account and connect with our platform, or use your existing wallet to connect.",
    },
    {
      name: "Create",
      image: mpCreate,
      heading: "Choose your network and category",
      text: "Select the network of your choice from the 8 options, and your Business category before we start the tokenisation process.",
    },
    {
      name: "Add",
      image: mpAdd,
      heading: "Tokenise the Asset",
      text: "Fill up the form with required details for tokenising your asset, and allow Unicus to get it done for you within few second.",
    },
    {
      name: "List",
      image: mpList,
      heading: "Trade or Auction your Asset",
      text: "Now you can list your NFTs (Tokenised Assets) for Sale or Auction on our platform.",
    },
  ];
  return (
    <div className="market-place-create-and-sell">
      <div className="left">
        <h2 className="heading">Tokenise & Trade your asset</h2>
        <Link to="/create-nft" className="btn nav-link">Tokenise Asset</Link>
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
