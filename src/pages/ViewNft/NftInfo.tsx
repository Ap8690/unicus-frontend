import "./viewnft.scss";
import nftImg from "../../assets/images/marketPlaceMain.png";
import {
  connectWallet,
  getAuction,
  getChainSymbol,
  getMarketPlace,
} from "../../utils/utils";
import {
  buyItemApi,
  cancelAuctionApi,
  endSaleApi,
  placeBidApi,
} from "../../services/api/supplier";
import { useState } from "react";
import web3 from "../../web3";
import { toast } from "react-toastify";

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
  const [bid, setbid] = useState<any>("");

  async function buyItem() {
    try {
      const address = await connectWallet(auction.chain);
      console.log("buy item", address, auction);
            
      const res = await getMarketPlace(
        auction.chain,
        auction.nftId.contractType
      ).methods.buyItem(auction.auctionId)
        .send({
          from: address,
          value: auction.startBid,
        });
      console.log(res);

      if (res?.transactionHash) {
        await buyItemApi(
          auction,
          res.transactionHash,
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

      const res = await getAuction(auction.chain, nft.contractType)
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
      if (new Date() < auction.auctionTimer) {
        toast.error("Auction is ongoing. Try cancelling.");
        return console.log("Auction Not ended Yet");
      }

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
      console.log(e);
      toast.error(e);
    }
  }

  async function cancelAuction() {
    try {
      const address = await connectWallet(auction.chain);

      const res = await getMarketPlace(
        auction.chain,
        auction.nftId.contractType
      )
        .methods.EndSale(auction.auctionId)
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
          <img src={topBid.img} alt="top-bid" className="user-img" />
          <div>
            <span>
              Highest bid by <span className="blue-text">{topBid.name}</span>
            </span>
            <div className="price-info">
              <span className="blue-head">{topBid.bid} ETH</span>
              <span>${topBid.price}</span>
            </div>
          </div>
        </div>
        <div className="btn-box">
          {/* <button className="btn" onClick={() => placeBid()}>
            Place a bid
          </button> */}
          <button className="btn" onClick={() => buyItem()}>
            Purchase Now
          </button>
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
