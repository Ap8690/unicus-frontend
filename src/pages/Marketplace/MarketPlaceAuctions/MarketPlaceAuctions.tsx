// Libs
import { useEffect, useState } from "react";
import * as nearAPI from 'near-api-js';

// Components
import MarketPlaceAuctionsElements from "./MarketPlaceAuctionsElements"
import MarketPlaceAuctionsNavigator from "./MarketPlaceAuctionsNavigator"
import BottomNavigationMarker from "../BottomNavigationMarker"
import {getAuctions} from "../../../services/api/supplier"

//function MarketPlaceAuctions(props: any): JSX.Element {
const MarketPlaceAuctions = ({ list }) =>{
  // Take list and filter as per the requirement
  const [currentType, setCurrentType] = useState("live");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayList, setDisplayList] = useState(list);

  //NEAR
  const [nftAuctionResults, setNftAuctionResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [assetBid, setAssetBid] = useState("");

  // Some hardcoded data
  const types = ["Live", "Upcoming", "Ended"]; //"Live", "Upcoming", "Ended"
  const length = width > 768 ? Math.ceil(displayList.length / 3) : displayList.length;

  //Near AUCTION ---------


  /*
  useEffect(() => {
    if (!showLoader) {
      loadAuctionItems();
    }
  }, [showLoader]);

  //Gets all the auctions
  const loadAuctionItems = async () => {
    let nftTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "nft-contract.unicus.testnet",
        methodName: "nft_tokens",
        args: {
        from_index: "0",
        limit: 64,
      }}); 

    let auctionTokens = await props.near.walletConnection
      .account()
      .viewFunction({
        contractId: "market_contract.unicus.testnet",
        methodName: "get_auctions_by_nft_contract_id",
        args: {
          nft_contract_id: "nft-contract.unicus.testnet",
          from_index: "0",
          limit: 64,
        }
        });

      let auctions = [];

    for (let i = 0; i < nftTokens.length; i++) {
      const { token_id } = nftTokens[i];
      let auctionToken = auctionTokens.find(({ token_id: t }) => t === token_id);
      if (saleToken !== undefined) {
        auctions[i] = Object.assign(nftTokens[i], auctionToken);
    
      }
    }
    setNftAuctionResults(auctions);
    setShowLoader(true);
  };

  const {
    utils: {
      format: { parseNearAmount},
    },
  } = nearAPI;

  //Place Bid on auction
  const OfferBid = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "offer_bid",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount(assetBid),
      gas: "200000000000000",
    })
  }

  //removes auction and rfundss if there is any existing bid
  const RemoveAuction = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "remove_auction",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: parseNearAmount("1"),
      gas: "200000000000000",
    })
  }

  //remove the auction and resolve purchase
  const ProcessPurchase = async (token_id) => {
    await props.near.walletConnection.account().functionCall({
      contractId: "market_contract.unicus.testnet",
      methodName: "process_auction_purchase",
      args: {
        nft_contract_id: "nft-contract.unicus.testnet",
        token_id,
      },
      attachedDeposit: 0,
      gas: "200000000000000",
    })
  }
  
  */



  // Filter out list on the basis of elements
  useEffect(() => {
    getAuctions(10,currentType)
    .then(res => {
      console.log(res);
      setDisplayList(res?.data.nfts)
    })
  }, [currentType]);

  useEffect(() => {
    getAuctions(10,currentType)
  },[])
  return (
    <div className="market-place-auctions">
      <MarketPlaceAuctionsNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        types={types}
        length={length}
        currentType={currentType}
        setCurrentType={setCurrentType}
      />
      <MarketPlaceAuctionsElements list={displayList} currentScroll={currentScroll} currentType={currentType} />
      <BottomNavigationMarker currentPage={currentScroll} length={length} />
    </div>
  );
};

export default MarketPlaceAuctions;
