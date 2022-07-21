import "./viewnft.scss";
import nftImg from "../../assets/images/marketPlaceMain.png";
import {
  approveNFTForSale,
  connectNear,
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
  getUserInfo,
  nearWalletConnection,
  offerPrice,
  sendStorageDeposit,
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
import {
  BASE_URL,
  bscChain,
  ethChain,
  nearChain,
  tronChain,
} from "../../config";
import axios from "axios";
import { setNotification } from "../../Redux/Blockchain/contracts";
import { getDecimal } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import Input from "../../components/Input/Input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NftInfo = ({
  filters,
  creator,
  activeFilter,
  setActiveFilter,
  historyData,
  topBid,
  nft,
  auction,
  setNftLoading,
}) => {
  const [startBid, setStartBid] = useState<any>(
    auction ? auction.startBid : 0.0
  );
  const [duration, setDuration] = useState("1");
  const [bid, setBid] = useState("");
  const [type, setType] = useState(0);
  const [popUpShow, setPopUpShow] = useState(false);
  const [popUpShowBid, setPopUpShowBid] = useState(false);

  const [button, setButton] = useState("Buy Now");
  const navigate = useNavigate();

  async function createSell() {
    try {
      console.log("bid", startBid);

      setPopUpShow(false);
      const address = await connectWallet(nft.chain);
      console.log("create sell", address, nft);
      let obj = {
        nftId: nft._id,
        sellerInfo: userInfo.username,
        auctionId: "",
        startBid: (parseFloat(startBid) * getDecimal(nft.chain)).toFixed(0),
        auctionType: "Sale",
        auctionHash: "",
        tokenId: nft.tokenId,
        chain: nft.chain,
        name: nft.name,
        cloudinaryUrl: nft.cloudinaryUrl,
        sellerWallet: address,
        sellerId: userInfo && userInfo._id,
      };
      if (startBid == 0.0) {
        toast.error("Asset Price cannot be zero");
        return;
      }
      if (nft.chain == nearChain) {
        obj.auctionId = nft.tokenId;
        localStorage.setItem("nearSellObj", JSON.stringify(obj));
        await sendStorageDeposit();

        return;
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
      setPopUpShow(false);
      const address = await connectWallet(nft.chain);
      console.log("create auction", address, auction);

      await getCreateNftContract(nft.chain)
        .methods.approve(getAuctionContractAddress(nft.chain), nft.tokenId)
        .send({ from: address });
      console.log(getCreateNftContractAddress(nft.chain, "721"));

      const res = await getAuctionContract(nft.chain)
        .methods.createAuction(
          getCreateNftContractAddress(nft.chain, "721"),
          nft.tokenId,
          web3.utils.toWei(startBid.toString(), "ether"),
          Number(duration) * 86400
        )
        .send({ from: address });
      console.log("res", res);

      let obj = {
        nftId: nft._id,
        sellerInfo: userInfo.username,
        auctionId: "",
        startBid: Number(startBid) * getDecimal(nft.chain),
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
        const success = await setNotification(res);
        if (success) {
          obj.auctionId = res;
          obj.auctionHash = res;
        } else {
          throw Error("Transaction Failed");
        }
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
      toast.error("Auction Failed");
    }
  }
  async function buyItem() {
    try {
      setNftLoading(true);
      const address = await connectWallet(auction.chain);
      console.log("buy item", address, auction);

      let transactionHash;
      if (nft.chain == nearChain) {
        await offerPrice(
          nft.tokenId,
          Number(auction.startBid) / getDecimal(nft.chain)
        );
        return;
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
      toast("Buy Successful");

      if (transactionHash) {
        toast("Updating asset info...");
        await buyItemApi(
          auction,
          transactionHash,
          creator.name,
          creator.id
        ).then((res: any) => {
          console.log(res.data);
          toast.success("Bought Item");
        });
        setNftLoading(false);
        window.location.reload();
      }
    } catch (e) {
      setNftLoading(false);
      toast.error(e);
    }
  }

  async function placeBid() {
    try {
      setNftLoading(true);
      const address = await connectWallet(auction.chain);

      const res = await getAuctionContract(auction.chain, nft.contractType)
        .methods.placeBid(auction.auctionId)
        .send({
          from: address,
          value: web3.utils.toWei(bid, "ether"),
        });
      console.log(res);
      toast("Bid placed Successful");
      if (res?.transactionHash) {
        toast("Updating bid info...");
        await placeBidApi(
          auction,
          res?.transactionHash,
          bid,
          creator.name,
          creator.email
        )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setNftLoading(false);
    } catch (e) {
      setNftLoading(false);
      toast.error(e);
    }
  }
  async function endSale() {
    try {
      setNftLoading(true);
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
        setNftLoading(false);
        window.location.reload();
      }
    } catch (e) {
      setNftLoading(false);
      toast.error(e);
    }
  }

  async function endAuction() {
    try {
      setNftLoading(true);

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
        setNftLoading(false);

        window.location.reload();
      }
    } catch (e) {
      setNftLoading(false);

      console.log(e);
      toast.error(e);
    }
  }

  async function cancelAuction() {
    try {
      setNftLoading(true);

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

        setNftLoading(false);

        window.location.reload();
      }
    } catch (e) {
      setNftLoading(false);

      console.log(e);
      toast.error(e);
    }
  }
  const getButtonName = () => {
    const userInfo = getUserInfo()
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
  const handleButtonClick = async () => {
        const userInfo = getUserInfo();

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
          setPopUpShowBid(true);
        }
      }
    } else {
      await connectWallet(nft.chain);
    }
  };

  //@ts-ignore
  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const txhash = urlParams.get("transactionHashes");
    const errorCode = urlParams.get("errorCode");

    console.log("sear", txhash, errorCode);

    if (errorCode) {
      toast.error(errorCode);
      return;
    } else if (txhash != null) {
      const address = await connectNear();
      axios
        .post("https://rpc.testnet.near.org", {
          jsonrpc: "2.0",
          id: "dontcare",
          method: "tx",
          params: [txhash, address],
        })
        .then((res: any) => {
          console.log("sear 1", res);

          if (
            res.data.result.transaction.actions[0].FunctionCall.method_name ==
            "storage_deposit"
          ) {
            const obj = JSON.parse(localStorage.getItem("nearSellObj"));

            approveNFTForSale(nft.tokenId, obj.startBid/getDecimal(obj.chain));
          } else if (
            res.data.result.transaction.actions[0].FunctionCall.method_name ==
            "nft_approve"
          ) {
            const obj = JSON.parse(localStorage.getItem("nearSellObj"));
            obj.auctionHash = txhash;
            createSellApi(obj).then((res) => {
              toast.success("Sale created");
              localStorage.removeItem("nearSellObj");
              navigate("/explore");
              console.log(res.data);
            });
          } else if (
            res.data.result.transaction.actions[0].FunctionCall.method_name ==
            "offer"
          ) {
            buyItemApi(auction, txhash, creator.name, creator.id).then(
              (res) => {
                toast.success("Buy successful");
                navigate("/profile");
                console.log(res.data);
              }
            );
          }
        });
    }
  }, []);

  return (
    <>
      <PlaceBid
        title={type === 0 ? "Input Price" : "Input Price and Time"}
        show={popUpShow}
        handleClose={() => setPopUpShow(false)}
        type="success"
      >
        <div className="success__body">
          <>
            <div className="mt-5 input_price">
              <Input
                title="Asset Price"
                placeholder="Enter Asset Price"
                state={startBid}
                setState={setStartBid}
                number
              />

              {type === 1 && (
                <div className="blockchain" style={{ marginTop: "15px" }}>
                  <div className="field-title">Duration</div>
                  <div className="select-chain">
                    <FormControl
                      variant="standard"
                      sx={{ m: 0, minWidth: 120, width: "100%" }}
                    >
                      <Select
                        labelId="chain-select-label"
                        id="chain-select"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        label="Chain"
                      >
                        <MenuItem value="1">1 Day</MenuItem>
                        <MenuItem value="2">2 Days</MenuItem>
                        <MenuItem value="3">3 Days</MenuItem>
                        <MenuItem value="4">4 Days</MenuItem>
                        <MenuItem value="5">5 Days</MenuItem>
                        <MenuItem value="6">6 Days</MenuItem>
                        <MenuItem value="7">7 Days</MenuItem>
                        <MenuItem value="8">8 Days</MenuItem>
                        <MenuItem value="9">9 Days</MenuItem>
                        <MenuItem value="10">10 Days</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              <button
                className="btn"
                style={{ marginTop: "15px" }}
                onClick={() => (type === 0 ? createSell() : createAuction())}
              >
                Submit
              </button>
            </div>
          </>
        </div>
      </PlaceBid>
      <PlaceBid
        title={"Bid NFT"}
        show={popUpShowBid}
        handleClose={() => setPopUpShowBid(false)}
        type="success"
      >
        <div className="success__body">
          <div className="mt-5 input_price">
            <Input
              title="Place Bid"
              placeholder="Enter Your Bid"
              state={bid}
              setState={setBid}
              number
            />
            <button
              className="btn"
              style={{ marginTop: "15px" }}
              onClick={() => placeBid()}
            >
              Place Bid
            </button>
          </div>
        </div>
      </PlaceBid>
      <div className="nft-info">
        <h2>{nft.name}</h2>
        <div className="nft-price">
          {auction && (
            <span>
              {auction?.lastBid
                ? (auction?.lastBid / getDecimal(nft.chain)).toFixed(4)
                : (auction?.startBid / getDecimal(nft.chain)).toFixed(4)}{" "}
              {getChainSymbol(nft.chain)}
            </span>
          )}
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
            {userInfo &&
            userInfo._id == nft.uploadedBy &&
            nft.nftStatus == 1 ? (
              <div style={{ width: "100%", display: "flex" }}>
                <button
                  className="btn"
                  onClick={() => {
                    setType(0);
                    setPopUpShow(true);
                  }}
                >
                  Create Sale
                </button>
                {nft.chain.toString() !== nearChain && (
                  <button
                    className="btn"
                    onClick={() => {
                      setType(1);
                      setPopUpShow(true);
                    }}
                  >
                    Start Auction
                  </button>
                )}
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
    </>
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
