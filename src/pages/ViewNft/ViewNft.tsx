import "./viewnft.scss";

import { useParams } from "react-router-dom";
import nftImg from "../../assets/images/marketPlaceMain.png";
import NftImg from "./NftImg";
import NftInfo from "./NftInfo";
import { useState } from "react";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import { AllNFTsElement } from "../AllNFTs/AllNFTsBody/AllNFTsElements";

const filters = ["Owners", "Bids", "Details", "History"];
const creator = {
  name: "David",
  img: nftImg,
};
const historyData = [
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
  {
    img: nftImg,
    name: "domiriganji",
    msg: "Bid 10 wETH",
    date: "11/3/2021, 10:57 AM",
  },
];
const list = [
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
  "Lorem Ipsum",
];
const topBid = {
  img: nftImg,
  name: "Richard Alpert",
  bid: "2.45",
};
const ViewNft = () => {
  const [activeFilter, setActiveFilter] = useState("Owners");
  const [placeBidModal, setPlaceBidModal] = useState(false);
  const [currentLoaded, setCurrentLoaded] = useState(10);
  const { id } = useParams();
  const handleClose = () => setPlaceBidModal(false);

  return (
    <>
      <PlaceBid onClose={handleClose} open={placeBidModal} />
      <div className="view-nft">
        <div className="nft">
          <NftImg img={nftImg} likes={7} shares={22} views={50} />
          <NftInfo
            filters={filters}
            creator={creator}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            historyData={historyData}
            topBid={topBid}
          />
        </div>
        <div className="nft bottom-grid">
          <h1>More from this collection</h1>
          <div>
            {list.map(item => (
              <AllNFTsElement element={item} />
            ))}
          </div>
          <div className="btn-box">
            <button className="btn-outline">
              View all
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNft;
