import "./viewnft.scss";

import { Link, useParams } from "react-router-dom";
import nftImg from "../../assets/images/marketPlaceMain.png";
import NftImg from "./NftImg";
import NftInfo from "./NftInfo";
import { useEffect, useState } from "react";
import PlaceBid from "../../components/modals/PlaceBid/PlaceBid";
import { AllNFTsElement } from "../AllNFTs/AllNFTsBody/AllNFTsElements";
import { getNftByCollection, getNftById } from "../../services/api/supplier";
import FullLoading from "../../components/modals/Loading/FullLoading";

const filters = ["Details", "History"];
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
  const [activeFilter, setActiveFilter] = useState("Details");
  const [placeBidModal, setPlaceBidModal] = useState(false);
  const [currentLoaded, setCurrentLoaded] = useState(10);
  const [nft, setNft] = useState<any>();
  const [auction, setAuction] = useState("");
  const [nftImg, setNftImg] = useState("");
  const [creator, setCreator] = useState("");
  const [nftStates, setNftStates] = useState<any>()
  const [nftLoading, setNftLoading] = useState<boolean>(false);
  const [nftByCollection, setNftByCollection] = useState<any>()
  const { chain, contractAddress, nftId } = useParams();
  const handleClose = () => setPlaceBidModal(false);

  async function fetchItem() {
    console.log(chain, contractAddress, nftId);
setNftLoading(true)
    const res = await getNftById(chain, contractAddress, nftId);
    console.log(res, "res");
    setNftLoading(false);

    setNft(res.data.nft);
    setNftStates(res.data.nftStates)
    setAuction(res.data.auction);
    setNftImg(res.data.nft.cloudinaryUrl);
    setCreator(res.data.user);
    if(nft.collectionName){
      const col = await getNftByCollection(nft.collectionName)
    setNftByCollection(col.data.nft)
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      {nftLoading && <FullLoading />}
      <div className="view-nft">
        <div className="nft">
          <NftImg img={nftImg} likes={7} shares={22} views={50} />
          {nft && (
            <NftInfo
              filters={filters}
              creator={creator}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              historyData={nftStates}
              topBid={topBid}
              nft={nft}
              auction={auction}
              setNftLoading={setNftLoading}
            />
          )}
        </div>
        {nft && nft.collectionName && (
          <div className="nft bottom-grid">
            <h1>More from this collection</h1>
            <div>
              {nftByCollection.map((item) => (
                <Link to={`/nft/${item.chain}/${item.contractAddress}/${item._id}`}>
                  <AllNFTsElement element={item} />
                </Link>
              ))}
            </div>
            {/* <div className="btn-box">
            <button className="btn-outline">View all</button>
          </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewNft;
