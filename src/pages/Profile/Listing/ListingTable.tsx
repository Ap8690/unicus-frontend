// Images
import { type } from "@testing-library/user-event/dist/type";
import { Form } from "react-bootstrap";
import ethereum from "../../../assets/svgs/ethereum.svg";
import DefaultModal from "../../../components/modals/DefaultModal/DefaultModal";
import { bscChain, ethChain, tronChain } from "../../../config";
import { getChainSymbol } from "../../../utils/utils";

// Element of data of activity table
const TableData = ({ activity }) => {
  // const createSell = async (item) => {
  //   const address = await connectWallet(item.chain);
  //   const listContract = new web3.eth.Contract(
  //     //@ts-ignore
  //     getCreateNftABI(item.chain),
  //     item.contractAddress
  //   );

  //   item.contractType == "721"
  //     ? await listContract.methods
  //         .approve(getMarketPlaceContractAddress(item.chain), item.tokenId)
  //         .send({ from: address })
  //     : await listContract.methods
  //         .setApprovalForAll("0x9fe9a1b02475783e5f85df0fcdaf8374fab1cc41", true)
  //         .send({ from: address });
  //   //else fr 1155 apprval fr all , params marketAdrress1155 , true
  //   const res = await getMarketPlace(item.chain, item.contractType)
  //     .methods.createSale(item.contractAddress, item.tokenId, SellPrice)
  //     .send({ from: address });

  //   let obj = {
  //     nftId: item._id,
  //     sellerInfo: userInfo.username,
  //     auctionId: "",
  //     startBid: SellPrice,
  //     auctionType: "Sale",
  //     auctionHash: "",
  //     tokenId: item.tokenId,
  //     chain: item.chain,
  //     name: item.name,
  //     cloudinaryUrl: item.cloudinaryUrl,
  //     sellerWallet: userAddress,
  //     sellerId: userInfo && userInfo._id,
  //   };
  //   if (item.chain === tronChain) {
  //     const success = await setNotification(res);
  //     if (success) {
  //       obj.auctionId = res;
  //       obj.auctionHash = res;
  //     } else {
  //       throw Error("Transaction Failed");
  //     }
  //   } else if (res?.transactionHash) {
  //     obj.auctionId = res.events.saleCreated.returnValues.itemId;
  //     obj.auctionHash = res.transactionHash;
  //   }
  //   await createSellApi(obj).then((res) => {
  //     console.log(res.data);
  //   });

  //   if (item.chain === tronChain) {
  //     // setHash(res);
  //   } else {
  //     // setHash(res?.transactionHash);
  //   }
  //   window.location.reload();
  // };

  // const createAuction = async (item) => {
  //   const createNFT = new web3.eth.Contract(
  //     getABI(item.chain),
  //     item.contractAddress
  //   );
  //   const auctionparam = await createNFT.methods
  //     .approve(auction._address, item.tokenId)
  //     .send({ from: accounts[0] });
  //   const res = await auction.methods
  //     .createAuction(createNFT._address, item.tokenId, AuctionPrice, duration)
  //     .send({ from: accounts[0] });
  //   console.log("First");
  //   let obj = {
  //     nftId: item._id,
  //     sellerInfo: userInfo.username,
  //     auctionId: "",
  //     startBid: AuctionPrice,
  //     auctionType: "Auction",
  //     duration: duration,
  //     auctionHash: "",
  //     tokenId: item.tokenId,
  //     chain: networkID,
  //     name: item.name,
  //     cloudinaryUrl: item.cloudinaryUrl,
  //     sellerWallet: userAddress,
  //     sellerId: userInfo && userInfo._id,
  //   };
  //   if (networkID === tronChain) {
  //     setNftLoading(true);
  //     setLoadingMessage(
  //       "Waiting for transaction confirmation.(It can take upto a min to confirm)"
  //     );
  //     const success = await setNotification(res);
  //     if (success) {
  //       obj.auctionId = res;
  //       obj.auctionHash = res;
  //     } else {
  //       throw Error("Transaction Failed");
  //     }
  //   } else if (res?.transactionHash) {
  //     obj.auctionId = res.events.AuctionCreated.returnValues.auctionId;
  //     obj.auctionHash = res.transactionHash;
  //   }
  //   await axios
  //     .post(`${BASE_URL}/auction/create`, obj, axiosConfig)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  //   await axios
  //     .post(`${BASE_URL}/auction/start`, obj, axiosConfig)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };
  const handleClick = () => {
    // logic for clearing activity here
  };
  return (
    <tr className="table-data">
      {/* <DefaultModal
        title={activity. === 0 ? "Input Price" : "Input Price and Time"}
        show={popUpShow}
        handleClose={() => setPopUpShow(false)}
        type="success"
      >
        <div className="success__body">
          {type === 0 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder={`0.00 ${getChainSymbol()}`}
                    value={price}
                    onChange={(e) => handlePriceChange(e)}
                  />
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand mt-3"
                  onClick={createSaleForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : type === 1 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder={`0.00 ${getChainSymbol()}`}
                    value={auctionPrice}
                    onChange={(e) => handlePriceChangeTwo(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <select
                    className="shadow-none form-control"
                    onChange={handleDurationChange}
                  >
                    <option hidden={true}>Select Duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8">8 Days</option>
                    <option value="9">9 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand"
                  onClick={createAuctionForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : null}
        </div>
      </DefaultModal> */}
      <td className="table-data-item-name">
        <img src={activity.image} alt={activity.item} />
        {activity.item}
      </td>
      <td className="table-data-price">
        <span className="eth-price">
          <img src={ethereum} alt="Ethereum" />
          {activity.priceEth}
        </span>
        <span className="dollar-price">${activity.priceDollar}</span>
      </td>
      <td className="table-data-fd">{activity.fd}</td>
      <td className="table-data-exp">{activity.exp}</td>
      <button className="clear-listing" onClick={handleClick}>
        X
      </button>
    </tr>
  );
};
const Table = ({ rows, columns }) => {
  return (
    <div className="table">
      
      <table>
        <thead>
          <tr>
            {columns.map((column: String, index: Number) => (
              <th key={`tch${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <TableData activity={row} key={`atd${i}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
