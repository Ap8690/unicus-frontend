import "./viewnft.scss";
import nftImg from "../../assets/images/marketPlaceMain.png";
import {
  approveNFTForSale,
  connectWallet,
  getAuctionContract,
  getAuctionContractAddress,
  getChainSymbol,
  getCreateNftABI,
  getCreateNftContract,
  getCreateNftContractAddress,
  getMarketPlace,
  getMarketplaceABI,
  getMarketPlaceContractAddress,
  getNftContractAddress,
  offerPrice,
  userInfo,
} from "../../utils/utils";
import {
  buyItemApi,
  cancelAuctionApi,
  createAuctionApi,
  createSellApi,
  endSaleApi,
  placeBidApi,
} from "../../services/api/supplier";
import { useEffect, useState } from "react";
import web3 from "../../web3";
import { toast } from "react-toastify";
import { BASE_URL, nearChain, tronChain } from "../../config";
import { duration } from "@mui/material";
import axios from "axios";
import { setNotification } from "../../Redux/Blockchain/contracts";
import { getDecimal } from "../../utils/helpers";

const NftInfo = ({
  filters,
  creator,
  activeFilter,
  setActiveFilter,
  historyData,
  topBid,
  nft,
  auction,
}) => {
  const [startBid, setStartbid] = useState<any>("0.05");
  const [bid, setBid] = useState("");
  const [button, setButton] = useState("Buy Now");

  async function createSell() {
    try {
      const address = await connectWallet(nft.chain);
      console.log("create sell", address, nft);
      let obj = {
        nftId: nft._id,
        sellerInfo: userInfo.username,
        auctionId: "",
        startBid: startBid * getDecimal(nft.chain),
        auctionType: "Sale",
        auctionHash: "",
        tokenId: nft.tokenId,
        chain: nft.chain,
        name: nft.name,
        cloudinaryUrl: nft.cloudinaryUrl,
        sellerWallet: address,
        sellerId: userInfo && userInfo._id,

      };

      if (nft.chain == nearChain) {
        obj.auctionId = nft.tokenId
        localStorage.setItem("nearSellObj",JSON.stringify(obj))
        await approveNFTForSale(nft.tokenId, startBid)
        return
      } else {
        const listContract = new web3.eth.Contract(
          //@ts-ignore
          getCreateNftABI(nft.chain),
          getNftContractAddress(nft)
        );

        console.log(listContract);

        nft.contractType && nft.contractType == "1155"
          ? await listContract.methods
              .setApprovalForAll(
                getMarketPlaceContractAddress(nft.chain, "1155"),
                true
              )
              .send({ from: address })
          : await listContract.methods
              .approve(getMarketPlaceContractAddress(nft.chain), nft.tokenId)
              .send({ from: address });
        //else fr 1155 apprval fr all , params marketAdrress1155 , true
        const res = await getMarketPlace(nft.chain)
          .methods.createSale(
            nft.contractAddress,
            nft.tokenId,
            web3.utils.toWei(startBid, "ether")
          )
          .send({ from: address });

        if (nft.chain === tronChain) {
          // setNftLoading(true);
          // setLoadingMessage(
          //   "Waiting for transaction confirmation.(It can take upto a min to confirm)"
          // );
          // const success = await setNotification(res);
          // if (success) {
          //   obj.auctionId = res;
          //   obj.auctionHash = res;
          // } else {
          //   throw Error("Transaction Failed");
          // }
        } else if (res?.transactionHash) {
          obj.auctionId = res.events.saleCreated.returnValues.itemId;
          obj.auctionHash = res.transactionHash;
        }
      }
      await createSellApi(obj).then((res) => {
        toast.success("Sale created");
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);

      toast.error(e);
    }
  }

  async function createAuction() {
    try {
      const address = await connectWallet(nft.chain);
      console.log("create auction", address, auction);

      const auctionparam = await getCreateNftContract(nft.chain)
        .methods.approve(getAuctionContractAddress(nft.chain), nft.tokenId)
        .send({ from: address });
      const res = await getAuctionContract(nft.chain)
        .methods.createAuction(
          getCreateNftContractAddress(nft.chain, "721"),
          nft.tokenId,
          startBid,
          duration
        )
        .send({ from: address });
      let obj = {
        nftId: nft._id,
        sellerInfo: userInfo.username,
        auctionId: "",
        startBid: startBid,
        auctionType: "Auction",
        duration: duration,
        auctionHash: "",
        tokenId: nft.tokenId,
        chain: nft.chain,
        name: nft.name,
        cloudinaryUrl: nft.cloudinaryUrl,
        sellerWallet: address,
        sellerId: userInfo && userInfo._id,
      };
      if (nft.chain === tronChain) {
        // setNftLoading(true);
        // setLoadingMessage(
        //   "Waiting for transaction confirmation.(It can take upto a min to confirm)"
        // );
        // const success = await setNotification(res);
        // if (success) {
        //   obj.auctionId = res;
        //   obj.auctionHash = res;
        // } else {
        //   throw Error("Transaction Failed");
        // }
      } else if (res?.transactionHash) {
        obj.auctionId = res.events.AuctionCreated.returnValues.auctionId;
        obj.auctionHash = res.transactionHash;
      }
      await createAuctionApi(obj).then((res) => {
        toast.success("Auction created");
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  }
  async function buyItem() {
    try {
      const address = await connectWallet(auction.chain);
      console.log("buy item", address, auction);

      let transactionHash;
      if (nft.chain == nearChain) {
        await offerPrice(nft.tokenId, auction.startBid);
      } else {
        const res = await getMarketPlace(
          auction.chain,
          auction.nftId.contractType
        )
          .methods.buyItem(auction.auctionId)
          .send({
            from: address,
            value: auction.startBid,
          });
        console.log(res);
      }

      if (transactionHash) {
        await buyItemApi(
          auction,
          transactionHash,
          creator.name,
          creator.id
        ).then((res: any) => {
          console.log(res.data);
          toast.success("Bought Item");
        });

        window.location.reload();
      }
    } catch (e) {
      toast.error(e);
    }
  }

  async function placeBid() {
    try {
      const address = await connectWallet(auction.chain);

      const res = await getAuctionContract(auction.chain, nft.contractType)
        .methods.placeBid(auction.auctionId)
        .send({
          from: address,
          value: web3.utils.toWei(bid, "ether"),
        });
      console.log(res);
      if (res?.transactionHash) {
        await placeBidApi(
          auction,
          res?.transactionHash,
          bid,
          creator.name,
          creator.email
        )
          .then((res) => {
            console.log(res.data);
            toast.success("Placed Bid");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (e) {
      toast.error(e);
    }
  }
  async function endSale() {
    try {
      const address = await connectWallet(auction.chain);

      const res = await getMarketPlace(
        auction.chain,
        auction.nftId.contractType
      )
        .methods.EndSale(auction.auctionId)
        .send({ from: address });
      if (res?.transactionHash) {
        await endSaleApi(auction, res.transactionHash, creator.name).then(
          (res) => {
            console.log(res.data);
            toast.success("Sale Ended");
          }
        );

        window.location.reload();
      }
    } catch (e) {
      toast.error(e);
    }
  }

  async function endAuction() {
    try {
      if (new Date() < auction.duration) {
        toast.error("Auction is ongoing. Try cancelling.");
        return console.log("Auction Not ended Yet");
      }

      const address = await connectWallet(auction.chain);

      const res = await getAuctionContract(auction.chain, nft.contractType)
        .methods.endAuction(auction.auctionId)
        .send({ from: address });
      if (res?.transactionHash) {
        await endSaleApi(auction, res.transactionHash, creator.name).then(
          (res) => {
            console.log(res.data);
            toast.success("Sale Ended");
          }
        );

        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  }

  async function cancelAuction() {
    try {
      const address = await connectWallet(auction.chain);

      const res = await getAuctionContract(auction.chain, nft.contractType)
        .methods.cancelAuction(auction.auctionId)
        .send({ from: address });
      if (res?.transactionHash) {
        await cancelAuctionApi(auction, res.transactionHash, creator.name).then(
          (res) => {
            console.log(res.data);
            toast.success("Auction Cancelled");
          }
        );

        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  }
  const getButtonName = () => {
    console.log(nft, userInfo);
    
    if (userInfo) {
      if (userInfo._id == nft.uploadedBy) {
        if (nft.nftStatus == 2) {
          return "End Sale";
        } else if (nft.v == 3) {
          return "End Auction";
        }
      } else {
        if (nft.nftStatus == 1) {
          return "Not For Sale";
        } else if (nft.nftStatus == 2) {
          return "Buy Now";
        } else if (nft.nftStatus == 3) {
          return "Place Bid";
        }
      }
    } else {
      return "Connect Wallet";
    }
  };
  const handleButtonClick = () => {
    if (userInfo) {
      if (userInfo._id == nft.uploadedBy) {
        if (nft.nftStatus == 2) {
          endSale();
        } else if (nft.nftStatus == 3) {
          if (new Date() < auction.duration) {
            cancelAuction();
          } else {
            endAuction();
          }
        }
      } else {
        if (nft.nftStatus == 1) {
          toast("NFT is not for sale yet");
        } else if (nft.nftStatus == 2) {
          buyItem();
        } else if (nft.nftStatus == 3) {
          placeBid();
        }
      }
    } else {
      connectWallet(nft.chain);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes");

    console.log("sear", urlParams, txhash);

    if (txhash != null) {
      const obj = JSON.parse(localStorage.getItem("nearSellObj"));
      obj.auctionHash = txhash
      createSellApi(obj).then((res) => {
        toast.success("Sale created");
        console.log(res.data);
      });
    }
  }, []);
  return (
    <div className="nft-info">
      <h2>{nft.name}</h2>
      <div className="nft-price">
        <span>
          {auction?.lastBid
            ? (auction?.lastBid / Math.pow(10, 18)).toFixed(4)
            : (auction?.startBid / Math.pow(10, 18)).toFixed(4)}{" "}
          {getChainSymbol(nft.chain)}
        </span>
        {/* <span>$ 5768.6</span>
        <span>12 in stock</span> */}
      </div>
      <div className="nft-description">
        <p>{nft.description}</p>
        {/* <button>Read More</button> */}
      </div>
      <div className="nft-creator">
        <span>Creator</span>
        <div>
          <img
            src={creator.profileUrl ? creator.profileUrl : nftImg}
            alt="creator"
            className="user-img"
          />
          <span>{creator.username}</span>
        </div>
      </div>
      <div className="more-info">
        <div className="filters">
          {filters.map((filter) => (
            <button
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn ${
                filter === activeFilter ? "active" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        {/* {activeFilter === 'History' && <History data={historyData} />} */}
        <History data={historyData} />
      </div>
      <div className="bid-buy-box">
        <div className="user-info">
          {/* <img src={topBid.img} alt="top-bid" className="user-img" /> */}
          <div>
            {/* <span>
              Highest bid by <span className="blue-text">{topBid.name}</span>
            </span> */}
            {/* <div className="price-info">
              <span className="blue-head">{topBid.bid} ETH</span>
              <span>${topBid.price}</span>
            </div> */}
          </div>
        </div>
        <div className="btn-box">
          {/* <button className="btn" onClick={() => placeBid()}>
            Place a bid
          </button> */}
          {userInfo && userInfo._id == nft.uploadedBy && nft.nftStatus == 1 ? (
            <div style={{ width: "100%", display: "flex" }}>
              <button className="btn" onClick={() => createSell()}>
                Sell
              </button>
              <button className="btn" onClick={() => createAuction()}>
                Start Auction
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => handleButtonClick()}>
              {getButtonName()}
            </button>
          )}
        </div>
        <span className="service-fee">Service fees 2%</span>
      </div>
    </div>
  );
};

const History = ({ data }) => {
  return (
    <div className="nft-history-box">
      {data.map((history) => (
        <div className="nft-history">
          <img className="user-img" src={history.img} alt={history.name} />
          <div>
            <div className="msg">{history.msg}</div>
            <div className="info">
              by {history.name} {history.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NftInfo;
