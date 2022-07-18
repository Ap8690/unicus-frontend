import "./viewnft.scss";

import { useParams } from "react-router-dom";
import nftImg from "../../assets/images/marketPlaceMain.png";
import NftImg from "./NftImg";
import NftInfo from "./NftInfo";
import { useEffect, useState } from "react";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import { AllNFTsElement } from "../AllNFTs/AllNFTsBody/AllNFTsElements";
import { getNftById } from "../../services/api/supplier";

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
const list = ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"];
const topBid = {
  img: nftImg,
  name: "Richard Alpert",
  bid: "2.45",
};
const ViewNft = () => {
  const [activeFilter, setActiveFilter] = useState("Owners");
  const [placeBidModal, setPlaceBidModal] = useState(false);
  const [currentLoaded, setCurrentLoaded] = useState(10);
  const [nft, setNft] = useState("");
  const [auction, setAuction] = useState("");
  const [nftImg, setNftImg] = useState("");
  const [creator, setCreator] = useState("");
  const { chain, contractAddress, nftId } = useParams();
  const handleClose = () => setPlaceBidModal(false);

  async function fetchItem() {
    console.log(chain, contractAddress, nftId);

    const res = await getNftById(chain, contractAddress, nftId);
    console.log(res, "res");
    setNft(res.data.nft);
    setAuction(res.data.auction);
    setNftImg(res.data.nft.cloudinaryUrl);
    setCreator(res.data.user);
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <PlaceBid onClose={handleClose} open={placeBidModal} />
      <div className="view-nft">
        <div className="nft">
          <NftImg img={nftImg} likes={7} shares={22} views={50} />
          {nft && 
          <NftInfo
            filters={filters}
            creator={creator}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            historyData={historyData}
            topBid={topBid}
            nft={nft}
            auction={auction}
          />
}
        </div>
        <div className="nft bottom-grid">
          <h1>More from this collection</h1>
          <div>
            {list.map((item) => (
              <AllNFTsElement element={item} />
            ))}
          </div>
          <div className="btn-box">
            <button className="btn-outline">View all</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNft;
