// Libs
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as nearAPI from 'near-api-js';

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
function MarketPlaceCreateAndSell(props: any): JSX.Element {

  const [nftMarketResults, setNftMarketResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [assetBid, setAssetBid] = useState("");

  useEffect(() => {
    if (!showLoader) {
      loadSaleItems();
    }
  }, [showLoader]);

  const loadSaleItems = async () => {
    let nftTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.boomboom.testnet",
        methodName: "nft_tokens",
        args: {
        from_index: "0",
        limit: 64,
      }});

    let saleTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.boomboom.testnet",
        methodName: "get_sales_by_nft_contract_id",
        args: {
          nft_contract_id: "nft-contract.boomboom.testnet",
          from_index: "0",
          limit: 64,
        }
        });

      let sales = [];

    for (let i = 0; i < nftTokens.length; i++) {
      const { token_id } = nftTokens[i];
      let saleToken = saleTokens.find(({ token_id: t }) => t === token_id);
      if (saleToken !== undefined) {
        sales[i] = Object.assign(nftTokens[i], saleToken);
    
      }
    }
    setNftMarketResults(sales);
    setShowLoader(true);
  };

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;

  /*place an offer on a specific sale. The sale will go through as long as your deposit is greater than or equal to the list price
  process the purchase (which will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties)
  -> Loop through nftmarketResults.map(nft, index), execute OfferPrice(nft.token_id)*/
  const OfferPrice = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.boomboom.testnet",
      methodName: "offer",
      args: {
        nft_contract_id: "nft-contract.boomboom.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount(assetBid),
      gas: "200000000000000",
    })
  }


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
        {elements.map((element, i) => (
          <Element element={element} key={`mpcs${i}`} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlaceCreateAndSell;
